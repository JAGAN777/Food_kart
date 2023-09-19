import MainApi from '../../../api/MainApi'


export const PlanApi =  {

    Plans:() => {
        return MainApi.get('/api/v1/auth/vendor/package-view')
    },

    plansDetails:(category_id,food_id,package_id) => {
        return MainApi.get(`/api/v1/all-subscription-packages?category_id=${category_id}&food_id=${food_id}&package_id=${package_id}`,
        // {
        //     "category_id":category_id,
        //     "food_id":food_id,
        //     "package_id":package_id
        // }
        )
    }
}