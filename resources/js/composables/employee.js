import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'

export default function useEmployee() {
    const employees = ref([])
    const employee = ref({
        first_name: '',
        last_name: '',
        company_id: '',
        email: '',
        phone: ''
    })

    const router = useRouter()
    const validationErrors = ref({})
    const isLoading = ref(false)
    const swal = inject('$swal')

    const getEmployees = async (
        page = 1,
        search_id = '',
        search_global = ''
    ) => {
        axios.get('/api/employees?page=' + page +
            '&search_id=' + search_id +
            '&search_global=' + search_global)
            .then(response => {
                employees.value = response.data.data;
            })
    }

    const getEmployee = async (id) => {
        axios.get('/api/employees/' + id)
            .then(response => {
                employee.value = response.data.data;
            })
    }

    const storeEmployee = async (employee) => {
        if (isLoading.value) return;

        isLoading.value = true
        validationErrors.value = {}

        let serializedPost = new FormData()
        for (let item in employee) {
            if (employee.hasOwnProperty(item)) {
                serializedPost.append(item, employee[item])
            }
        }

        axios.post('/api/employees', serializedPost)
            .then(response => {
                router.push({name: 'employees.index'})
                swal({
                    icon: 'success',
                    title: 'Employee saved successfully'
                })
            })
            .catch(error => {
                if (error.response?.data) {
                    swal({
                        icon: 'error',
                        title: error.response?.data.message
                    })
                    validationErrors.value = error.response.data.errors
                }
            })
            .finally(() => isLoading.value = false)
    }

    const updateEmployee = async (employee) => {
        if (isLoading.value) return;

        isLoading.value = true
        validationErrors.value = {}

        axios.put('/api/employees/' + employee.id, employee)
            .then(response => {
                router.push({name: 'employees.index'})
                swal({
                    icon: 'success',
                    title: 'Employee updated successfully'
                })
            })
            .catch(error => {
                if (error.response?.data) {
                    swal({
                        icon: 'error',
                        title: error.response?.data.message
                    })
                    validationErrors.value = error.response.data.errors
                }
            })
            .finally(() => isLoading.value = false)
    }

    const deleteEmployee = async (id) => {
        swal({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this action!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            confirmButtonColor: '#ef4444',
            timer: 20000,
            timerProgressBar: true,
            reverseButtons: true
        })
            .then(result => {
                if (result.isConfirmed) {
                    axios.delete('/api/employees/' + id)
                        .then(response => {
                            getEmployees()
                            router.push({name: 'employees.index'})
                            swal({
                                icon: 'success',
                                title: 'employee deleted successfully'
                            })
                        })
                        .catch(error => {
                            swal({
                                icon: 'error',
                                title: 'Something went wrong'
                            })
                        })
                }
            })
    }

    return {
        employees,
        employee,
        getEmployees,
        getEmployee,
        storeEmployee,
        updateEmployee,
        deleteEmployee,
        validationErrors,
        isLoading
    }
}
