<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCompanyRequest;
use App\Http\Requests\UpdateCompanyRequest;
use App\Http\Resources\CompanyResource;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     */
    public function index()
    {
        $companies = Company::filtered();
        return $this->apiSuccessResponse('Companies List', $companies);
    }

    /**
     * Display a listing of the resource.
     *
     */
    public function getCompaniesForDropdown()
    {
        $companies = Company::all(['id', 'name']);
        return $this->apiSuccessResponse('Companies List', $companies);
    }

    /**
     * Store a newly created resource in storage.
     * @param StoreCompanyRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StoreCompanyRequest $request)
    {
        $company = new Company();
        $company->name = $request->name;
        $company->email = $request->email;
        $company->website = $request->website;
        if ($request->hasFile('logo')) {
            $image_path = $request->file('logo')->store('companyLogo', 'public');
            $company->logo = $image_path;
        }

        if($company->save()) {
            $company->sendCompanyAddNotification();
            return $this->apiSuccessResponse('Company has been saved successfully', new CompanyResource($company));
        } else {
            return $this->apiErrorResponse('CS: Something went wrong', [], 403);
        }
    }

    /**
     * Display the specified resource.
     * @param Company $company
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Company $company)
    {
        if ($company) {
            return $this->apiSuccessResponse('Company Found', new CompanyResource($company));
        } else {
            return $this->apiErrorResponse('CS: Something went wrong', [], 403);
        }
    }

    /**
     * Update the specified resource in storage.
     * @param UpdateCompanyRequest $request
     * @param Company $company
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateCompanyRequest $request, Company $company)
    {
        $company->name = $request->name;
        $company->email = $request->email;
        $company->website = $request->website;
        if ($request->hasFile('logo')) {
            $image_path = $request->file('logo')->store('companyLogo', 'public');
            $company->logo = $image_path;
        }

        if($company->save()) {
            return $this->apiSuccessResponse('Company has been updated successfully', new CompanyResource($company));
        } else {
            return $this->apiErrorResponse('CU: Something went wrong', [], 403);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Company $company)
    {
        $isLogo  = $company->logo ? Storage::disk('public')->delete($company->logo) : true;
        if($isLogo) {
            $company->delete();
        }
        return response()->noContent();
    }
}
