export const heroView = (subTitle, user) => {
    return `
    <div class="hero-body">
        <div class="hero-header">
            <div class="title">
                Nodepop
                <div class="lds-ellipsis is-hidden"><div></div><div></div><div></div><div></div></div>
            </div>
                <p class="type-select" class="subtitle">
                ${subTitle} <i class="fas fa-sort-down"></i>
            </p>
            <div class="selector is-hidden">
                <ul>
                    <li class="venta-selector">Venta</li>
                    <li class="compra-selector">Compra</li>
                </ul>
            </div>
        </div>
        <div class="hero-user">
            <div class="user">
                ${ (user) ? (
                        `<p>${user.username}</p>
                        <i class="fas fa-sign-out-alt logout"></i>`
                    ) : (
                        `<i class="fas fa-sign-in-alt login"></i>`
                    )             
                }
                
            </div>
        </div>
    </div>
    `

}