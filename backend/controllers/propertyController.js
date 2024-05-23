import Property from "./../models/propertyModel.js"

const addProperty = async(req, res) => {
    try {
        const { sellerId, title, description, address, price, numberOfBathrooms, numberOfBedrooms, area, amenities, images} = req.body;

        const newProperty = new Property({
            sellerId, title, description, address, price, numberOfBathrooms, numberOfBedrooms, area, amenities, images
        })

        await newProperty.save()
        res.status(200).json(newProperty)
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(`Error in addProperty: ${error.message}`)
    }
}

const getProperty = async(req, res) => {
    try {
        const { id } = req.params
        const property = await Property.findById(id)

        if(!property) {
            return res.status(404).json({error: "Property not found"})
        }
        res.status(200).json(property)

    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(`Error in getProperty: ${error.message}`)
    }
}

const likeUnlikeProperty = async(req, res) => {
    try {
        const { id } = req.params 
        const user = req.user 
        const property = await Property.findById(id)

        if(!property) {
            return res.status(404).json({ error: "Property not found" })
        }
        const isLiked = property.likes.filter((like) => like.valueOf() == user._id);
        if(isLiked.length > 0) {
            property.likes = property.likes.filter((id) => id.valueOf() != user._id.valueOf())
            await property.save()
            return res.status(200).json({ message: "Successfully Unliked"})
        }
        console.log(user._id.valueOf(), user._id)
        property.likes.push(user._id)
        await property.save()
        res.status(200).json({ message: "Successfully liked" })
    }
    catch (error) {
        res.status(500).json({ error: error.message })
        console.log(`Error in LikePost: ${error.message}`)
    }
}

export { addProperty, getProperty, likeUnlikeProperty }