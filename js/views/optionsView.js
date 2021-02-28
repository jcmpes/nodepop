export const optionsView = (isLogged) => {
    if(isLogged) {
        return `
            <div class="user">
                <!-- This area is just a placeholder to keep the new-post button at the bottom of the page with flex in css -->
                <!-- The user information is handled elsewhere -->
            </div>
            <div class="new-post">
                <a href="/newPost.html"> 
                    <button class="is-primary is-rounded"><i class="fas fa-plus"></i></button>
                </a>
            </div>
        `
    } else {
        return ''
    }
}