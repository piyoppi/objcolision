export default class display{
    constructor(element){
        this.element = element;
        this._display_obj = {};
    }

    renderElements(elements){
        elements.forEach(element => {
            if( !(element.id in this._display_obj) ){
                this._display_obj[element.id] = document.createElement('div');
                this.element.appendChild(this._display_obj[element.id]);
            }
            let dispelem = this._display_obj[element.id];
            dispelem.style.position = "absolute";
            dispelem.style.left = `${element.x}px`;
            dispelem.style.top  = `${element.y}px`;
            dispelem.style.width = `${element.width}px`;
            dispelem.style.height = `${element.height}px`;
            dispelem.style.backgroundColor = element.color;
        });
    }
}
