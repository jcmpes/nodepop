export const heroView = (type) => {
    if (type == "Venta") {
        return `
        <div class="hero-body">
            <div class="title">
                Nodepop
                <div class="lds-ellipsis is-hidden"><div></div><div></div><div></div><div></div></div>
            </div>
                <p class="subtitle">
                Browse items for sell from users
            </p>
      </div>
        `
    }

    if (type == "Compra") {
        return `
        <div class="hero-body">
            <div class="title">
                Nodepop
                <div class="lds-ellipsis is-hidden"><div></div><div></div><div></div><div></div></div>
            </div>
                <p class="subtitle">
                    Browse items searched by users
                </p>
        </div>
        `
    }
}