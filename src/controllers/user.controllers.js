import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js"
import { uploadOnCloundinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    //raw data
    // res.status(200).json({
    //     message: "chai aur code"
    // })


    //get user details from frontend
    //validation - not empty
    //check if user already exit: username, email
    //check for img, also for avtar
    //upload on cloudinary, avator
    //create user object - create entry in db
    // remove password and refresh token field from response
    //check for user creation
    //returns res

    const { fullName, email, userName, password } = req.body
    console.log("fullname: ", fullName);
    console.log("email: ", email);
    console.log("username: ", userName);
    console.log("password: ", password);

    if (
        [fullName, email, userName, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
    const existedUser = await User.findOne({
        $or: [{ userName }, { email }]
    })
    if (existedUser) {
        throw new ApiError(409, "User with email or username already exit")
    }

    console.log(req.files);

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloundinary(avatarLocalPath)
    const coverImage = await uploadOnCloundinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        userName: userName.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }


    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
})

export { registerUser }