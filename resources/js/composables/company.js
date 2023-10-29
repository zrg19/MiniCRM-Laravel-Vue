import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'

export default function useCompany() {
    const companies = ref([])
    const company = ref({})

    const router = useRouter()
    const validationErrors = ref({})
    const isLoading = ref(false)
    const logoFile = ref('')
    const swal = inject('$swal')

    const onFileChange = (evt) => {
        const file = evt.target.files[0];

        let allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        const errors = [];

        if (!file) {
            errors.push('Please select an image file');
            return;
        }

        if (!allowedTypes.includes(file.type)) {
            errors.push('Invalid file type. Only jpeg, png, and gif are allowed.');
        }

        if (file.size > 500000) {
            errors.push('File size too large. Maximum size is 500KB.');
        }

        let image = new Image();
        let reader = new FileReader();

        reader.onload = (e) => {
            image.src = e.target.result;

            image.onload = () => {
                if (image.width < 100 || image.height < 100) {
                    errors.push('Image resolution too low. Minimum size is 100x100.');
                }

                if (errors.length === 0) {
                    logoFile.value = file;
                    validationErrors.value = {};
                } else {
                   validationErrors.value  = {
                       image: errors
                   }
                }
            };
        };
        reader.readAsDataURL(file);
    };

    const getCompanies = async (
        page = 1,
        search_id = '',
        search_global = ''
    ) => {
        axios.get('/api/companies?page=' + page +
            '&search_id=' + search_id +
            '&search_global=' + search_global)
            .then(response => {
                companies.value = response.data.data;
            })
    }
    const getCompaniesDropdown = async () => {
        axios.get('/api/companiesForDropdown')
            .then(response => {
                companies.value = response.data.data;
            })
    }

    const getCompany = async (id) => {
        axios.get('/api/companies/' + id)
            .then(response => {
                company.value = response.data.data;
            })

    }

    const storeCompany = async (company) => {
        if (isLoading.value) return;

        isLoading.value = true
        validationErrors.value = {}

        let serializedPost = new FormData()
        for (let item in company) {
            if (company.hasOwnProperty(item)) {
                serializedPost.append(item, company[item])
            }
        }
        if (logoFile.value) {
            serializedPost.append('logo', logoFile.value);
        }

        axios.post('/api/companies', serializedPost)
            .then(response => {
                router.push({name: 'companies.index'})
                swal({
                    icon: 'success',
                    title: 'Company saved successfully'
                })
            })
            .catch(error => {
                console.log(error);
                if (error.response?.data) {
                    validationErrors.value = error.response.data.errors
                }
            })
            .finally(() => isLoading.value = false)
    }

    const updateCompany = async (company) => {
        if (isLoading.value) return;

        isLoading.value = true
        validationErrors.value = {}

        let serializedPost = new FormData()
        for (let item in company) {
            if (company.hasOwnProperty(item) && item != 'logo') {
                serializedPost.append(item, company[item])
            }
        }
        if (logoFile.value) {
            serializedPost.append('logo', logoFile.value);
        }

        axios.post('/api/companies/' + company.id+'?_method=PUT', serializedPost)
            .then(response => {
                router.push({name: 'companies.index'})
                swal({
                    icon: 'success',
                    title: 'Company updated successfully'
                })
            })
            .catch(error => {
                if (error.response?.data) {
                    console.log('Error:', error.response)
                    validationErrors.value = error.response.data.errors
                }
            })
            .finally(() => isLoading.value = false)
    }

    const deleteCompany = async (id) => {
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
                    axios.delete('/api/companies/' + id)
                        .then(response => {
                            getCompanies()
                            router.push({name: 'companies.index'})
                            swal({
                                icon: 'success',
                                title: 'Company deleted successfully'
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
        companies,
        company,
        getCompanies,
        getCompany,
        storeCompany,
        updateCompany,
        deleteCompany,
        validationErrors,
        isLoading,
        onFileChange,
        getCompaniesDropdown
    }
}
