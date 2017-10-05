export default class basicItem{
    
    constructor(param){
        this.id = param.id || 0;                                                //識別番号（一意である必要がある）
        this.position = param.position || [0, 0];                               //位置
        this.width = param.width || 50;                                         //幅
        this.height = param.height || 50;                                       //高さ
        this.force = param.force || [0.0, 0.0];                                 //力
        this.forceList = [];                                                    //力リスト
        this.mass = param.mass || 1.0;                                          //質量
        this.velocity = param.velocity || [0.0, 0.0];                           //速度
        this.animate = null;                                                    //アニメーション
        this.color = param.color || 'black';                                    //色
        this.colisionInfoList = [];                                             //あたり判定情報
        this.isGround = false;                                                  //接地状態
        this.pin = param.pin || false;
        this.disableGravity = param.disableGravity || false;                    //重力の無効
        this.disableExternalForce = param.disableExternalForce || false;        //外力の無効
        this.proc = param.proc || [];                                           //追加処理
        this.materialName = param.materialName || 'default';                    //素材情報

        //摩擦関連
        this.cntRestingStateCausedFriction = 0;
        this.isEfficientFriction = false;

        //最小力
        this.minForce = 0.0001;

        //１ステップ前の速度
        this.beforeVelocity = [0, 0];
    }

    addForce(vecForce, vecFace = null, pair = null, option = {}){
        if( !option.forceAdd && this.disableExternalForce ) return;

        this.force[0] += vecForce[0];
        this.force[1] += vecForce[1];
        this.forceList.push( { addX: vecForce[0], addY: vecForce[1], vecFace: vecFace, pair: pair} );
    }

    setForce(vecForce, option={}){
        if( !option.forceAdd && this.disableExternalForce ) return;
        this.force[0] = vecForce[0];
        this.force[1] = vecForce[1];
    }

}
