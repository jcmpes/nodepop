export const heroView = (subTitle) => {
        return `
        <div class="hero-body">
            <div class="title">
                Nodepop
                <div class="lds-ellipsis is-hidden"><div></div><div></div><div></div><div></div></div>
            </div>
                <p class="subtitle">
                ${subTitle}
            </p>
      </div>
        `

}