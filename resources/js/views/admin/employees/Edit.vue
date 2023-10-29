<template>
    <div class="row justify-content-center my-5">
        <div class="col-md-10">
            <div class="card border-0 shadow-sm">
                <div class="card-body">
                    <form @submit.prevent="submitForm">
                        <div class="mb-3">
                            <label for="first_name" class="form-label">First Name</label>
                            <input v-model="employee.first_name" id="first_name" type="text" class="form-control">
                            <div class="text-danger mt-1">
                                {{ errors.first_name }}
                            </div>
                            <div class="text-danger mt-1">
                                <div v-for="message in validationErrors?.first_name">
                                    {{ message }}
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="last_name" class="form-label">Last Name</label>
                            <input v-model="employee.last_name" id="last_name" type="text" class="form-control">
                            <div class="text-danger mt-1">
                                {{ errors.last_name }}
                            </div>
                            <div class="text-danger mt-1">
                                <div v-for="message in validationErrors?.last_name">
                                    {{ message }}
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input v-model="employee.email" id="email" type="email" class="form-control">
                            <div class="text-danger mt-1">
                                <div v-for="message in validationErrors?.email">
                                    {{ message }}
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="phone" class="form-label">Phone</label>
                            <input v-model="employee.phone" id="phone" type="text" class="form-control">
                        </div>
                        <!-- Company -->
                        <div class="mb-3">
                            <label class="form-label">
                                Company
                            </label>
                            <v-select v-model="employee.company_id" :options="companies" :reduce="company => company.id" label="name" class="form-control" />
                        </div>
                        <!-- Buttons -->
                        <div class="mt-4">
                            <button :disabled="isLoading" class="btn btn-primary">
                                <div v-show="isLoading" class=""></div>
                                <span v-if="isLoading">Processing...</span>
                                <span v-else>Save</span>
                            </button>
                            <router-link :to="{ name: 'employees.index' }" class="btn btn-primary float-end">
                                Back
                            </router-link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { onMounted, reactive, watchEffect } from "vue";
    import { useRoute } from "vue-router";
    import useCompany from "@/composables/company";
    import useEmployee from "@/composables/employee";

    const { companies, getCompaniesDropdown } = useCompany();
    const { updateEmployee, getEmployee, employee: postData, validationErrors, isLoading } = useEmployee();

    import { useForm, useField, defineRule } from "vee-validate";
    import { required, min } from "@/validation/rules"
    defineRule('required', required)
    defineRule('min', min);

    // Define a validation schema
    const schema = {
        first_name: 'required|min:2',
        last_name: 'required|min:2'
    }

    // Create a form context with the validation schema
    const { validate, errors, resetForm } = useForm({ validationSchema: schema })
    // Define actual fields for validation
    const { value: first_name } = useField('first_name', null, { initialValue: '' });
    const { value: last_name } = useField('last_name', null, { initialValue: '' });
    const { value: email } = useField('email', null, { initialValue: '' });
    const { value: phone } = useField('phone', null, { initialValue: '' });
    const { value: company_id } = useField('company_id', null, { initialValue: '', label: 'company' });

    const employee = reactive({
        first_name,
        last_name,
        email,
        phone,
        company_id,
    })

    const route = useRoute()
    function submitForm() {
        validate().then(form => { if (form.valid) updateEmployee(employee) })
    }
    onMounted(() => {
        getEmployee(route.params.id)
        getCompaniesDropdown()
    })
    // https://vuejs.org/api/reactivity-core.html#watcheffect
    watchEffect(() => {
        employee.id = postData.value.id
        employee.first_name = postData.value.first_name
        employee.last_name = postData.value.last_name
        employee.email = postData.value.email
        employee.phone = postData.value.phone
        employee.company_id = postData.value.company_id
    })
</script>
