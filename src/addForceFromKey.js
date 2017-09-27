import keyReceiver from "./keyReceiver.js"

export default class addForceFromKey{
    constructor(){
        let keyInfos = [
            { name: 'left',  description: '', keyCode: '37' },
            { name: 'right', description: '', keyCode: '39' },
        ];

        this.keyReceiver = new keyReceiver(keyInfos);
    }

    execute(item){
        this.keyReceiver.reloadKeyInfo();
        if( this.keyReceiver.keyInformation.left.isKeyDown ){
            item.force[0] -= 3;
            console.log('Add force');
        }
        else if( this.keyReceiver.keyInformation.right.isKeyDown ){
            item.force[0] += 3;
            console.log('Add force');
        }
    }
}
