<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use App\Models\userInfo;
use App\Models\staticInfo;

class regController extends Controller
{

    public function saveUserInfo(Request $request)
    {
        $paymentInfoArray = [];
        $userName = $request->input('userName');
        $fatherName = $request->input('fatherName');
        $motherName = $request->input('motherName');
        $rollNo = $request->input('rollNo');
        $mobileNumber = $request->input('mobileNumber');
        $PresentAddress = $request->input('presentAddress');
        $paymentInfoArray = [
            "mobileNumber" => $mobileNumber,
            "invoiceNo" => $rollNo,
            "invoiceDate" => date("Y-m-d")
        ];
        if ($request->hasFile('userPic')) {
            $file = $request->file('userPic');
            $allowedExtensions = ['jpg', 'jpeg', 'png'];
            $extension = strtolower($file->getClientOriginalExtension());
            if (!in_array($extension, $allowedExtensions)) {
                return response()->json(['status' => 400, 'msg' => 'Invalid file format. Only JPG, JPEG, and PNG files are allowed.']);
            }
            $maxSize = 5 * 1024; // 5 MB in kilobytes
            $fileSize = filesize($file) / 1024;
            if ($fileSize > $maxSize) {
                return response()->json(['status' => 400, 'msg' => 'File size exceeds the maximum allowed size of 5 MB.']);
            }
            $fileName = $rollNo . '_' . time() . '.' . $extension;

            $file->storeAs('uploads', $fileName);
            userInfo::where('rollno', $rollNo)->update([
                'name' => $userName,
                'fname' => $fatherName,
                'mname' => $motherName,
                'present_adrs' => $PresentAddress,
                'userpic' => $fileName,
                'paymentInfo' => json_encode($paymentInfoArray)
            ]);
            $data = [
                'status' => 200,
                'msg' => 'Data Upload successful',
            ];

        } else {
            $data = [
                'status' => 204,
                'msg' => 'Data Upload Unsuccessful',
            ];

        }

        return response()->json($data);

    }
    public function checkRollNo(Request $request)
    {
        $data = [];
        $rollNo = $request->input('rollNo');
        if ($this->rollCheck($rollNo) == true) {
            $regType = 'c';
        } else {
            $regType = 'r';
        }
        if (userInfo::where('rollno', $rollNo)->exists()) {
            //getting all information of users if the user exists in DB;
            $infoAll = userInfo::where('rollno', $rollNo)->first();
            if ($infoAll->paymentVarification == 0) {
                //if user payment verification is not done the create or update the user
                $data = [
                    'status' => 200,
                    'eligibility' => $regType,
                    'rollNo' => $rollNo,
                    'payMentVerification' => $infoAll->paymentVarification
                ];


            } else {
                $data = [
                    'status' => 200,
                    'eligibility' => $regType,
                    'rollNo' => $rollNo,
                    'payMentVerification' => $infoAll->paymentVarification
                ];
            }
        } else {
            userInfo::updateOrCreate(['rollno' => $rollNo]);
            $infoAll = userInfo::where('rollno', $rollNo)->first();
            $infoAll->reg_type = $regType;
            $infoAll->save();
            if ($this->rollCheck($rollNo) == true) {
                $data = [
                    'status' => 200,
                    'eligibility' => $regType,
                    'rollNo' => $rollNo,
                    'payMentVerification' => $infoAll->paymentVarification
                ];
            } else {
                $data = [
                    'status' => 200,
                    'eligibility' => $regType,
                    'rollNo' => $rollNo,
                    'payMentVerification' => $infoAll->paymentVarification
                ];
            }

            //echo "no";
        }

        // $data = $request->input();
        return response()->json($data);

    }


    public function api1Call(Request $request)
    {
        $paymentInfo = json_decode($this->getUserInfo($request->input('rollNo'), 'paymentInfo'));
        $regType = $this->getUserInfo($request->input('rollNo'), 'reg_type');
        //$regType='c';
        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'Authorization' => 'Basic QkFOQkVJUzEyMzpCYU4hQkUjaVNA',
        ])
            ->post($this->getStaticInfo('sonali_bank_api_info', 'api1'), [
                'AccessUser' => [
                    'userName' => $this->getStaticInfo('sonali_bank_api_info', 'userName'),
                    'password' => $this->getStaticInfo('sonali_bank_api_info', 'password'),
                ],
                'invoiceNo' => $paymentInfo->invoiceNo,
                'amount' => $regType == 'c' ? $this->getStaticInfo('sonali_bank_api_info', 'amountConvocation') : $this->getStaticInfo('sonali_bank_api_info', 'amountReunion'),
                'invoiceDate' => $paymentInfo->invoiceDate,
                'accounts' => [
                    [
                        'crAccount' => $this->getStaticInfo('sonali_bank_api_info', 'cuetAccount'),
                        'crAmount' => $regType == 'c' ? $this->getStaticInfo('sonali_bank_api_info', 'amountConvocation') : $this->getStaticInfo('sonali_bank_api_info', 'amountReunion'),
                    ],
                ],
            ]);

        return $response->body();
        //echo $regType == 'c' ? $this->getStaticInfo('sonali_bank_api_info', 'amountConvocation') : $this->getStaticInfo('sonali_bank_api_info', 'amountReunion');
    }

    public function api2Call(Request $request)
    {
        $paymentInfo = json_decode($this->getUserInfo($request->input('rollNo'), 'paymentInfo'));
        $regType = $this->getUserInfo($request->input('rollNo'), 'reg_type');
        $apiAccessToken = $request->input('apiAccessToken');
        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'Authorization' => 'Basic ZHVVc2VyMjAxNDpkdVVzZXJQYXltZW50MjAxNA==',
        ])
            ->post($this->getStaticInfo('sonali_bank_api_info', 'api2'), [
                "authentication" => [
                    "apiAccessUserId" => $this->getStaticInfo('sonali_bank_api_info', 'userName'),
                    "apiAccessToken" => $apiAccessToken
                ],
                "referenceInfo" => [
                    "InvoiceNo" => $paymentInfo->invoiceNo,
                    "invoiceDate" => $paymentInfo->invoiceDate,
                    "returnUrl" => $this->getStaticInfo('sonali_bank_api_info', 'returnUrl'),
                    "totalAmount" => $regType == 'c' ? $this->getStaticInfo('sonali_bank_api_info', 'amountConvocation') : $this->getStaticInfo('sonali_bank_api_info', 'amountReunion'),
                    "applicentName" => $this->getUserInfo($request->input('rollNo'), 'name'),
                    "applicentContactNo" => $paymentInfo->mobileNumber,
                    "extraRefNo" => "CUET_REUNION_CONVO"
                ],
                "creditInformations" => [
                    [
                        "slno" => "1",
                        "crAccount" => $this->getStaticInfo('sonali_bank_api_info', 'cuetAccount'),
                        "crAmount" => $regType == 'c' ? $this->getStaticInfo('sonali_bank_api_info', 'amountConvocation') : $this->getStaticInfo('sonali_bank_api_info', 'amountReunion'),
                        "tranMode" => "TRN"
                    ]
                ]
            ]);
        if (json_decode($response->body())->status == '200') {
            $infoAll = userInfo::where('rollno', $request->input('rollNo'))->first();
            $infoAll->paymentVerificationInfo = json_decode($response->body())->session_token;
            $infoAll->save();
        }
        return $response->body();
    }


    public function api4Call(Request $request)
    {
        $data = [];
        $rollNo = $request->input('rollNo');
        if (userInfo::where('rollno', $rollNo)->exists()) {
            $infoAll = userInfo::where('rollno', $rollNo)->first();
            if($infoAll->paymentVarification=='1'){
                $data = [
                    'status' => '200',
                    'rollNo' => $rollNo,
                    'name' => $infoAll->name,
                    'msg' => 'Payment done'

                ];
            }
            else{
                if (!empty($infoAll->paymentVerificationInfo)) {
                    $response = Http::withHeaders([
                        'Content-Type' => 'application/json',
                        'Authorization' => 'Basic ZHVVc2VyMjAxNDpkdVVzZXJQYXltZW50MjAxNA==',
                    ])
                        ->post($this->getStaticInfo('sonali_bank_api_info','api4'), [
                            'session_Token' => $infoAll->paymentVerificationInfo,
                        ])
                        ->body();

                    if (json_decode($response)->status == '200') {
                        $infoAll->paymentVerificationInfo=$response;
                        $infoAll->paymentVarification='1';
                        $infoAll->save();
                        $data = [
                            'status' => '200',
                            'rollNo' => $rollNo,
                            'name'=>$infoAll->name,
                            'msg' => 'Payment done'

                        ];
                    } else {
                        $data = [
                            'status' => '217',
                            'rollNo' => $rollNo,
                            'msg' => 'Payment is not paid'

                        ];
                    }

                } else {
                    $data = [
                        'status' => '217',
                        'rollNo' => $rollNo,
                        'msg' => 'Your payment was incomplete'

                    ];
                }
            }
        } else {
            $data = [
                'status' => '217',
                'rollNo' => $rollNo,
                'msg' => 'User is not registered yet'

            ];
        }

        return json_encode($data);
    }
    public function rollCheck($rollNo): bool
    {
        $roll = '111';

        if ($rollNo == $roll) {
            return true;
        } else {
            return false;
        }


    }


    public function getStaticInfo($infoType, $info)
    {
        $getStaticInfo = staticInfo::where('info_type', $infoType)->first();
        $sonaliBankApiInfo = json_decode($getStaticInfo->info);
        $getData = $sonaliBankApiInfo->$info;
        return $getData;
    }

    public function getUserInfo($rollNo, $selectType)
    {
        $userInfoAll = userInfo::where('rollno', $rollNo)->first();
        return $userInfoAll->$selectType;

    }
}
