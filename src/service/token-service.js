export function getToken(){
    return localStorage.getItem('token');
}
export function setExpiry(time){
    localStorage.setItem('expiresAt',time)
}
export function setToken(token){
    localStorage.setItem('token',token)
}

export function getExpiry(){
    return localStorage.getItem('expiresAt')
}
export function expireToken(){
    let time=getExpiry()*1000;
    setTimeout(()=>{
        localStorage.setItem('token','');
    },time)
    
}
export function setUserId(id){
    localStorage.setItem('user_id',id)
}