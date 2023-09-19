import MainApi from '../../../api/MainApi'


export const CoustomerApi = { 
    testimonials : () => {
        return MainApi.get('/api/v1/testimonial')
    }
}