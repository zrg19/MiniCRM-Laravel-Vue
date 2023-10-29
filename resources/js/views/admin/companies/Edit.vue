<template>
    <div class="row justify-content-center my-5">
        <div class="col-md-10">
            <div class="card border-0 shadow-sm">
                <div class="card-body">
                    <form @submit.prevent="submitForm">
                        <div class="mb-3">
                            <label for="user-title" class="form-label">Name</label>
                            <input v-model="company.name" id="user-title" type="text" class="form-control">
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
                            <div v-if="company.logo">
                                <img :src="company.logo" alt="" width="80">
                            </div>
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
                            <router-link :to="{ name: 'companies.index' }" class="btn btn-primary float-end">
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
    const { updateCompany, getCompany, company: postData, validationErrors, isLoading, onFileChange } = useCompany();

    import { useForm, useField, defineRule } from "vee-validate";
    import { required, min } from "@/validation/rules"
    defineRule('required', required)
    defineRule('min', min);

    // Define a validation schema
    const schema = {
        name: 'required|min:2',
    }

    // Create a form context with the validation schema
    const { validate, errors, resetForm } = useForm({ validationSchema: schema })
    // Define actual fields for validation
    const { value: name } = useField('name', null, { initialValue: '' });
    const { value: email } = useField('email', null, { initialValue: '' });
    const { value: website } = useField('website', null, { initialValue: '' });

    const company = reactive({
        name,
        email,
        website
    })

    const route = useRoute()
    function submitForm() {
        if(!!validationErrors.value?.image) return;
        validate().then(form => { if (form.valid) updateCompany(company) })
    }
    onMounted(() => {
        getCompany(route.params.id)
    })
    // https://vuejs.org/api/reactivity-core.html#watcheffect
    watchEffect(() => {
        company.id = postData.value.id
        company.name = postData.value.name
        company.email = postData.value.email
        company.website = postData.value.website
        company.logo = postData.value.logo
    })
</script>
