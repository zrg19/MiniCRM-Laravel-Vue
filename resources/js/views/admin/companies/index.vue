<template>
    <div class="row justify-content-center my-2">
        <div class="col-md-12">
            <div class="card border-0">
                <div class="card-header bg-transparent">
                    <h5 class="float-start">Companies</h5>
                    <router-link :to="{ name: 'companies.create' }" class="btn btn-primary btn-sm float-end">
                        Add New
                    </router-link>
                </div>
                <div class="card-body shadow-sm">
                    <div class="row">
                        <div class="col-md-3">
                            <input v-model="search_id" type="number"
                                   class="inline-block mt-1 form-control"
                                   placeholder="Filter by ID">
                        </div>
                        <div class="col-md-3">
                            <input v-model="search_global" type="text" placeholder="Search..."
                                   class="inline-block mt-1 form-control">
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                            <tr>
                                <th class="px-6 py-3 text-start">
                                    ID
                                </th>
                                <th>
                                    Logo
                                </th>
                                <th class="px-6 py-3 text-left">
                                    Company Name
                                </th>
                                <th class="px-6 py-3 text-left">
                                    Email
                                </th>
                                <th class="px-6 py-3 text-left">
                                    Website
                                </th>
                                <th class="px-6 py-3 bg-gray-50 text-left">
                                    Created at
                                </th>
                                <th class="px-6 py-3 bg-gray-50 text-left">
                                    Actions
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="company in companies.data" :key="company.id">
                                <td class="px-6 py-4 text-sm">
                                    {{ company.id }}
                                </td>
                                <td class="px-6 py-4 text-sm">
                                    <img :src="prepareLogoUrl(company.logo)" alt="" width="50">
                                </td>
                                <td class="px-6 py-4 text-sm">
                                    {{ company.name }}
                                </td>
                                <td class="px-6 py-4 text-sm">
                                    {{ company.email }}
                                </td>
                                <td class="px-6 py-4 text-sm">
                                    {{ company.website }}
                                </td>
                                <td class="px-6 py-4 text-sm">
                                    {{ company.created_at }}
                                </td>
                                <td class="px-6 py-4 text-sm">
                                    <router-link
                                                 :to="{ name: 'companies.edit', params: { id: company.id } }"
                                                 class="badge bg-primary">Edit
                                    </router-link>
                                    <a href="#" @click.prevent="deleteCompany(company.id)"
                                       class="ms-2 badge bg-danger">Delete</a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="card-footer">
                    <Pagination :data="companies" :limit="3"
                                @pagination-change-page="page => getCompanies(page, search_id, search_global)"
                                class="mt-4"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import {ref, onMounted, watch} from "vue";
    import useCompany from "@/composables/company";

    const search_id = ref('')
    const search_global = ref('')
    const {companies, getCompanies, deleteCompany} = useCompany()
    onMounted(() => {
        getCompanies()
    })
    const prepareLogoUrl = (path) => {
        return config.baseUrl + '/storage/' + path
    }
    watch(search_id, (current, previous) => {
        getCompanies(
            1,
            current,
            search_global.value
        )
    })
    watch(search_global, _.debounce((current, previous) => {
        getCompanies(
            1,
            search_id.value,
            current
        )
    }, 200))
</script>
