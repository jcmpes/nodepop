export const registerView = () => {
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
                <div class="field">
                <div class="field-label is-normal">
                        <label class="label">E-mail address</label>
                    </div>
                    <p class="control is-expanded has-icons-left has-icons-right">
                        <input class="input is-success" name="email" type="email" placeholder="Email">
                        <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                        </span>
                        <span class="icon is-small is-right">
                        <i class="fas fa-check"></i>
                        </span>
                    </p>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label is-normal">
                <label class="label">Mobile</label>
            </div>
            <div class="field-label"></div>
            <div class="field-body">
                <div class="field is-expanded">
                    <div class="field has-addons">
                        <p class="control">
                            <a class="button is-static">
                                +44
                            </a>
                        </p>
                        <p class="control is-expanded">
                        <input class="input" name="mobile" type="tel" placeholder="Your phone number">
                        </p>
                    </div>
                <p class="help">Do not enter the first zero</p>
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

        <div class="field">
            <p class="control has-icons-left">
                <input class="input" type="password" placeholder="Repeat Password">
                <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                </span>
            </p>
        </div>

        <div class="field is-horizontal">                
                <button id="submit-btn" class="button is-primary">
                    Register
                </button>
                <p class="is-pulled-right">Already registered? <a class="login-link" href="">Log in</a></p>               
        </div>      
 
    `
}