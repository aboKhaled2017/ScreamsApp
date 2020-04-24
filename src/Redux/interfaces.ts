export interface ILike{
    userHandle:string
    screamId:string
}
export interface INotification{
     type:string 
     read:boolean 
     recipient:string 
     sender:string 
     createdAt:string 
     screamId:string 
     notificationId:string
}
export interface IScream{
    screamId:string
    createdAt:string
    body:string
    userImage:string
    userHandle:string
    commentCount:number
    likeCount:number
    comments:IComment[]
}
export interface IComment{
    createdAt:string 
    userHandle:string 
    body:string 
    userImage:string 
    screamId:string
}
export interface IUSerDetails{
    bio:string|''
    website:string|''
    location:string|''
}
export interface IUSerCredentials{
    email:string
    userId:string
    imgUrl:string 
    createdAt:string 
    handle:string    
}
export interface ICredentials extends IUSerDetails{
    email:string
    userId:string
    imgUrl:string 
    createdAt:string 
    handle:string    
}
export interface IUserState{
    authenticated:boolean
    credentials:ICredentials
    likes:ILike[]
    notifications:INotification[]
    loading:boolean
}

export interface IValidationUiErros{
    email?:string,
    password?:string,
    general?:string
    confirmPassword?:string,
    handle?:string
    body?:string
}
export interface IUIState{
    loading:boolean
    errors:IValidationUiErros
}

export interface ILoginModel{
    email:string
    password:string
}
export interface ISignUpModel{
  email:string
  password:string
  confirmPassword:string
  handle:string
}
export interface IComponentHistory{
    push:(url:string)=>void
}
export interface IDataState{
    loading:boolean 
    scream:IScream 
    screams:IScream[]
}
export interface IUserData{
    user:IUSerCredentials
    screams:IScream[]
} 