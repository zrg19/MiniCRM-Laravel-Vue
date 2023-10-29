<template>
    <div class="row justify-content-center my-5">
        <div class="col-md-10">
            <div class="card border-0 shadow-sm">
                <div class="card-body">
                    <form @submit.prevent="submitForm">
                        <div class="mb-3">
                            <label for="post-title" class="form-label">Name</label>
                            <input v-model="company.name" id="post-title" type="text" class="form-control">
                            <div class="text-danger mt-1">
                                {{ errors.name }}
                            </div>
                            <div class="text-danger mt-1">
                                <div v-for="message in validationErrors?.name">
                                    {{ message }}
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input v-model="company.email" id="email" type="email" class="form-control">
                            <div class="text-danger mt-1">
                                {{ errors.email }}
                            </div>
                            <div class="text-danger mt-1">
                                <div v-for="message in validationErrors?.email">
                                    {{ message }}
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="logo" class="form-label">Company Logo</label>
                            [<small>Minimum resolution is 100x100.</small>]
                            <input id="logo" type="file" @change="onFileChange" class="form-control">
                            <div class="text-danger mt-1">
                                <div v-for="message in validationErrors?.image">
                                    {{ message }}
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="website" class="form-label">Website</label>
                            <input v-model="company.website" id="website" type="text" class="form-control">
                        </div>
                        <!-- Buttons -->
                        <div class="mt-4">
                            <button :disabled="isLoading" class="btn btn-primary">
                                <div v-show="isLoading" class=""></div>
                                <span v-if="isLoading">Processing...</span>
                                <span v-else>Save</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { reactive } from "vue";
    import useCompany from "@/composables/company";

    const { storeCompany, validationErrors, isLoading, onFileChange } = useCompany();

    import { useForm, useField, defineRule } from "vee-validate";
    import { required, min } from "@/validation/rules";
    defineRule('required', required);
    defineRule('min', min);

    // Define a validation schema
    const schema = {
        name: 'required|min:2'
    }
    // Create a form context with the validation schema
    const { validate, errors } = useForm({ validationSchema: schema })
    // Define actual fields for validation
    const { value: name } = useField('name', null, { initialValue: '' });
    const { value: email } = useField('email', null, { initialValue: '' });
    const { value: website } = useField('website', null, { initialValue: '' });

    const company = reactive({
        name,
        email,
        website,
    })
    function submitForm() {
        if(!!validationErrors.value?.image) return;
        validate().then(form => { if (form.valid) storeCompany(company) })
    }
</script>
