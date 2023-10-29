<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEmployeeRequest;
use App\Http\Requests\UpdateEmployeeRequest;
use App\Http\Resources\EmployeeResource;
use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $employess = Employee::filtered();
        return $this->apiSuccessResponse('Employees List', $employess);
    }

    /**
     * Store a newly created resource in storage.
     * @param StoreEmployeeRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StoreEmployeeRequest $request)
    {
        $employee = new Employee();
        $employee->first_name = $request->first_name;
        $employee->last_name = $request->last_name;
        $employee->email = $request->email;
        $employee->phone = $request->phone;
        $employee->company_id = $request->company_id;


        if($employee->save()) {
            return $this->apiSuccessResponse('Employee has been saved successfully', new EmployeeResource($employee));
        } else {
            return $this->apiErrorResponse('ES: Something went wrong', [], 403);
        }
    }

    /**
     * Display the specified resource.
     * @param Employee $employee
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Employee $employee)
    {
        if($employee) {
            return $this->apiSuccessResponse('Employee Found', new EmployeeResource($employee));
        } else {
            return $this->apiErrorResponse('ES: Something went wrong', [], 403);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEmployeeRequest $request, Employee $employee)
    {
        $employee->first_name = $request->first_name;
        $employee->last_name = $request->last_name;
        $employee->email = $request->email;
        $employee->phone = $request->phone;
        $employee->company_id = $request->company_id;


        if($employee->save()) {
            return $this->apiSuccessResponse('Employee has been updated successfully', new EmployeeResource($employee));
        } else {
            return $this->apiErrorResponse('ES: Something went wrong', [], 403);
        }
    }

    /**
     * Remove the specified resource from storage.
     * @param Employee $employee
     * @return \Illuminate\Http\Response
     */
    public function destroy(Employee $employee)
    {
        $employee->delete();
        return response()->noContent();
    }
}
