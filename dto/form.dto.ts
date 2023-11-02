export interface signUpType {
  isNewUser: boolean
  verified: boolean
  firstName: string
  lastName: string
  phoneNo: string
  email: string
  password: string
  confirmPassword: string
  forgotPassword: boolean
}

export interface listingType {
  name: string
  community: string
  houseType: string
  address: string
  description: string
  price: string
  tenure: string
  features: {
    bedroom: boolean
    toilet: boolean
    guestRoom: boolean
    parkingSpace: boolean
  }
  images: File[]
}
