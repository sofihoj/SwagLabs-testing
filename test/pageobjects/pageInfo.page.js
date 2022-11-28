class Info {
    get aboutBtn () {
        return $('#about_sidebar_link')
    }

    get resetBtn () {
        return $('#reset_sidebar_link')
    }

    get closeMenu () {
        return $('#react-burger-cross-btn')
    }

    get twitterIcon () {
        return $('#page_wrapper > footer > ul > li.social_twitter')
    }

    get facebookIcon () {
        return $('#page_wrapper > footer > ul > li.social_facebook > a')
    }

    get linkedinIcon () {
        return $('#page_wrapper > footer > ul > li.social_linkedin > a')
    }
}

export default new Info();