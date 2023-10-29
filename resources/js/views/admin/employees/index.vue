<template>
    <div class="row justify-content-center my-2">
        <div class="col-md-12">
            <div class="card border-0">
                <div class="card-header bg-transparent">
                    <h5 class="float-start">Employees</h5>
                    <router-link :to="{ name: 'employees.create' }" class="btn btn-primary btn-sm float-end">
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
                                <th class="px-6 py-3 text-left">
                                    Full Name
                                </th>
                                <th class="px-6 py-3 text-left">
                                    Email
                                </th>
                                <th class="px-6 py-3 text-left">
                                    Phone
                                </th>
                                <th class="px-6 py-3 text-left">
                                    Company
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
                            <tr v-for="emp in employees.data" :key="emp.id">
                                <td class="px-6 py-4 text-sm">
                                    {{ emp.id }}
                                </td>
                                <td class="px-6 py-4 text-sm">
                                    {{ emp.first_name + ' ' + emp.last_name }}
                                </td>
                                <td class="px-6 py-4 text-sm">
                                    {{ emp.email }}
                                </td>
                                <td class="px-6 py-4 text-sm">
                                    {{ emp.phone }}
                                </td>
                                <td class="px-6 py-4 text-sm">
                                    {{ emp.company?.name || ''}}
                                </td>
                                <td class="px-6 py-4 text-sm">
                                    {{ emp.created_at }}
                                </td>
                                <td class="px-6 py-4 text-sm">
                                    <router-link
                                                 :to="{ name: 'employees.edit', params: { id: emp.id } }"
                                                 class="badge bg-primary">Edit
                                    </router-link>
                                    <a href="#" @click.prevent="deleteEmployee(emp.id)"
                                       class="ms-2 badge bg-danger">Delete</a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="card-footer">
                    <Pagination :data="employees" :limit="3"
                                @pagination-change-page="page => getEmployees(page, search_id, search_global)"
                                class="mt-4"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import {ref, onMounted, watch} from "vue";
    import useEmployee from "@/composables/employee";

    const search_id = ref('')
    const search_global = ref('')
    const {employees, getEmployees, deleteEmployee} = useEmployee()
    onMounted(() => {
        getEmployees()
    })

    watch(search_id, (current, previous) => {
        getEmployees(
            1,
            current,
            search_global.value
        )
    })
    watch(search_global, _.debounce((current, previous) => {
        getEmployees(
            1,
            search_id.value,
            current
        )
    }, 200))
</script>
