class OnTheGo {
    static addToTopButton(referenceButton) {
        const jump = referenceButton.cloneNode();
        jump.innerHTML = 'To Top';//文字text
        jump.addEventListener('click', () => {
            const scrollToTop = () => {
                const c = document.documentElement.scrollTop || document.body.scrollTop;
                if (c > 0) {
                    window.requestAnimationFrame(scrollToTop);
                    window.scrollTo(0, c - c / 16);
                }
            };
            scrollToTop();
        });//动画animation

        //样式style
        //对原样式进行了较大的更改，现在变成固定在右下角的一个⚪
        jump.style.position = 'fixed';
        jump.style.bottom = '50px';
        jump.style.right = '50px';
        jump.style.width = '80px';
        jump.style.height = '80px';
        jump.style.borderRadius = '50%';
        jump.style.overflow = 'hidden';
        jump.style.cursor = 'pointer';
        jump.style.transition = 'background-color 0.5s';

        document.body.appendChild(jump);
    }

    static main() {
        ['txt', 'img'].forEach((mode) => {
            //是否处于紧凑型提示词布局(Compact prompt layout) 原代码未对紧凑型提示词布局做处理，这里在紧凑型提示词布局时仅添加按钮
            const resultsElement = document.getElementById(mode + '2img_results');
            const isCompactLayout = resultsElement && resultsElement.querySelector('#' +mode+ '2img_generate_box');

            const referenceButton = document.getElementById(mode + '2img_generate');
            if (isCompactLayout) {
                OnTheGo.addToTopButton(referenceButton);
                return;
            }//only button

            const it_btn = document.getElementById('interrogate');
            it_btn.parentElement.style.display = 'contents';

            const generate_btn = document.getElementById(mode + '2img_generate_box');//修正，生成按钮

            const box = generate_btn.parentElement;
            box.style.padding = '10px';

            const result = document.getElementById(mode + '2img_results');
            result.parentNode.querySelector('.resize-handle').remove();

            const container = generate_btn.parentElement;
            container.appendChild(result);
            container.style.display = 'flex';
            container.style.flexDirection = 'column';//将生成结果放置在下方

            const resultWidth = result.offsetWidth;
            container.style.width = resultWidth + 'px';//保证宽度与生成按钮一致

            const settings = document.getElementById(mode + '2img_settings');
            settings.style.width = '200%';//下方设置排布铺满

            OnTheGo.addToTopButton(referenceButton);
        });
    }
}

onUiLoaded(async () => OnTheGo.main());

function handleWindowResize() {
    OnTheGo.main();
}

window.addEventListener('resize', handleWindowResize);//监听屏幕变化
