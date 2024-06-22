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
        jump.style.width = '100px';
        jump.style.height = '100px';
        jump.style.borderRadius = '50%';
        jump.style.overflow = 'hidden';
        jump.style.cursor = 'pointer';
        jump.style.transition = 'background-color 0.5s';

        document.body.appendChild(jump);
    }

    static main() {
        //是否处于紧凑型提示词布局(Compact prompt layout) 原代码未对紧凑型提示词布局做处理，这里在紧凑型提示词布局时仅添加按钮
        const resultsElement = document.getElementById('txt2img_results');
        const isCompactLayout = resultsElement && resultsElement.querySelector('#txt2img_generate_box');

        if (isCompactLayout) {
            const referenceButton = document.getElementById('txt2img_generate');
            OnTheGo.addToTopButton(referenceButton);
            return;//only button
        }

        ['txt', 'img'].forEach((mode) => {
            const it_btn = document.getElementById('interrogate');
            it_btn.parentElement.style.display = 'contents';

            const generate_btn = document.getElementById(mode + '2img_generate');

            const box = generate_btn.parentElement;
            box.style.padding = '10px';

            const result = document.getElementById(mode + '2img_results');
            result.parentNode.querySelector('.resize-handle').remove();

            const container = generate_btn.parentElement;
            container.appendChild(result);
            container.style.display = 'flex';
            container.style.flexDirection = 'column';//原作者的代码在现在的webui版本会导致生成框在生成按钮右方，这里将其改回下方

            const settings = document.getElementById(mode + '2img_settings');
            settings.style.width = '200%';//将其余内容(settings)填充满整个页面

            OnTheGo.addToTopButton(generate_btn);
        });
    }
}

onUiLoaded(async () => OnTheGo.main());
