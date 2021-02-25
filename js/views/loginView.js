export const loginView = () => {
    return `
        <div class="field is-horizontal">
            
            <div class="field-body">
                <div class="field">
                    <div class="field-label is-normal">
                        <label class="label">Username</label>
                    </div>
                    <p class="control is-expanded has-icons-left">
                        <input class="input" name="name" type="text" placeholder="Name">
                        <span class="icon is-small is-left">
                        <i class="fas fa-user"></i>
                        </span>
                    </p>
                </div>
            </div>
        </div>

        <div class="field-label is-normal">
            <label class="label">Password</label>
        </div>
        <div class="field">
            <p class="control has-icons-left">
                <input class="input" name="password" type="password" placeholder="Password">
                <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                </span>
            </p>
        </div>

        <div class="field is-horizontal">                
                <button id="login-btn" class="button is-primary">
                    Log In
                </button>
                <p class="is-pulled-right">Not a registered user? <a class="register-link" href="">Register Here</a></p>               
        </div>    

        
 
    `
}