export const optionsView = (user) => {
    console.log(user)
    if(user) {
        return `
            <div class="user">
                <p>${user.username}</p>
                <i class="fas fa-sign-out-alt logout"></i>
            </div>
            <div class="new-post">
                <button class="is-primary is-rounded"><i class="fas fa-plus"></i></button>
            </div>
        `
    } else {
        return `
            <div class="user">
                <i class="fas fa-sign-in-alt login"></i>
            </div>
        `
    }
    
}