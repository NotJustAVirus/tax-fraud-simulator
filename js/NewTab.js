let boxes = this.window.find(".website-box");
for (let i = 0; i < boxes.length; i++) {
    let element = $(boxes[i]);
    element.click(() => {
        this.navigate(element.data("page"));
    });
}