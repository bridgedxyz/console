import React from "react"

const isIFrame = (input: HTMLElement | null): input is HTMLIFrameElement =>
    input !== null && input.tagName === 'IFRAME';

export default class FrameFlutter extends React.Component<{ js: string }> {

    componentDidMount() {
        console.log('props', this.props)
        let iframe = document.getElementById('frame') as HTMLIFrameElement
        if (isIFrame(iframe) && iframe.contentWindow) {
            iframe.onload = () => {
                iframe.contentWindow!.postMessage(
                    { command: "execute", html: '<h1>loading...</h1>', css: 'h1 { text-align: center }', js: this.props.js },
                    '*'
                );
            }
        }
    }

    render() {
        return (
            <iframe id="frame" width="375" height="812" src="/quicklook-assets/flutter/frame-flutter.html" sandbox="allow-scripts"></iframe>
        )
    }
}