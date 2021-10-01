
namespace cameraOffsetScene {
    let stateStack: CameraOffsetState[];

    class CameraOffsetState {
        constructor(public sprite: Sprite, public offsetx: number, public offsety: number) {
        }
    }

    //% blockId=riknoll_camera_follow_with_offset
    //% block="camera follow sprite $sprite with offset x $offsetx offset y $offsety"
    //% sprite.shadow=variables_get
    //% sprite.defl=mySprite
    //% blockNamespace=scene
    //% group="Camera"
    export function cameraFollowWithOffset(sprite: Sprite, offsetx: number, offsety: number) {
        if (!stateStack) {
            stateStack = [];
            initScene();
            game.addScenePushHandler(initScene);
            game.addScenePopHandler(() => {
                stateStack.pop();
                if (!stateStack.length) {
                    initScene();
                }
            });
        }

        const state = stateStack[stateStack.length - 1];
        state.sprite = sprite;
        state.offsetx = offsetx;
        state.offsety = offsety;

        game.currentScene().camera.sprite = null;
    }

    function initScene() {
        stateStack.push(new CameraOffsetState(null, 0, 0));
        game.currentScene().eventContext.registerFrameHandler(scene.PRE_RENDER_UPDATE_PRIORITY - 1, () => {
            const state = stateStack[stateStack.length - 1];

            if (state && state.sprite) {
                game.currentScene().camera.offsetX = state.sprite.x + state.offsetx - (screen.width >> 1);
                game.currentScene().camera.offsetY = state.sprite.y + state.offsety - (screen.height >> 1);
            }
        })
    }
}