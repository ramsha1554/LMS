import RazorPayInstance from "../config/razorpay.js"
import Course from "../model/courseModel.js"

export const RazorpayOrder = async (req,res) => {

    try {

        const { courseId } = req.body

        const course = await Course.findById(courseId)

        if(!course){

            return res.status(404).json({
                message:"Course is not found"
            })

        }

        const options = {

            amount: course.price * 100,

            currency:'INR',

            receipt:`${courseId}`

        }

        const order = await RazorPayInstance.orders.create(options)

        return res.status(200).json(order)

    } catch (error) {

        return res.status(500).json({
            message:`Failed to create Razorpay Order ${error}`
        })

    }

}