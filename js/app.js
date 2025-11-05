// ========================================
// 企画書メーカー - メインスクリプト
// ========================================

// ページが読み込まれたら実行される関数
document.addEventListener('DOMContentLoaded', function() {
    console.log('企画書メーカーが起動しました！');

    // 初期化処理
    initializeApp();
});

// ========================================
// アプリの初期化
// ========================================
function initializeApp() {
    // リアルタイムプレビュー機能をセットアップ
    setupRealtimePreview();

    // テンプレート切り替え機能をセットアップ
    setupTemplateSwitch();
}

// ========================================
// リアルタイムプレビュー機能
// ========================================
function setupRealtimePreview() {
    // 入力フィールドを全て取得
    const inputs = {
        title: document.getElementById('proposal-title'),
        subtitle: document.getElementById('proposal-subtitle'),
        objective: document.getElementById('proposal-objective'),
        target: document.getElementById('proposal-target'),
        content: document.getElementById('proposal-content'),
        benefits: document.getElementById('proposal-benefits'),
        budget: document.getElementById('proposal-budget')
    };

    // プレビュー表示エリアを全て取得
    const preview = {
        title: document.querySelector('.doc-title'),
        subtitle: document.querySelector('.doc-subtitle'),
        sections: document.querySelectorAll('.section-content')
    };

    // タイトルの入力イベント
    // 入力があるたびにプレビューを更新
    inputs.title.addEventListener('input', function() {
        const value = this.value.trim();
        preview.title.textContent = value || 'タイトルを入力してください';

        // 入力があった時のアニメーション効果
        animateElement(preview.title);
    });

    // サブタイトルの入力イベント
    inputs.subtitle.addEventListener('input', function() {
        const value = this.value.trim();
        preview.subtitle.textContent = value || 'サブタイトルを入力してください';
        animateElement(preview.subtitle);
    });

    // 企画の目的の入力イベント
    inputs.objective.addEventListener('input', function() {
        const value = this.value.trim();
        preview.sections[0].textContent = value || '企画の目的を入力してください';
        animateElement(preview.sections[0].parentElement);
    });

    // ターゲットの入力イベント
    inputs.target.addEventListener('input', function() {
        const value = this.value.trim();
        preview.sections[1].textContent = value || 'ターゲットを入力してください';
        animateElement(preview.sections[1].parentElement);
    });

    // 企画内容の入力イベント
    inputs.content.addEventListener('input', function() {
        const value = this.value.trim();
        preview.sections[2].textContent = value || '企画内容を入力してください';
        animateElement(preview.sections[2].parentElement);
    });

    // 期待される効果の入力イベント
    inputs.benefits.addEventListener('input', function() {
        const value = this.value.trim();
        preview.sections[3].textContent = value || '期待される効果を入力してください';
        animateElement(preview.sections[3].parentElement);
    });

    // 予算の入力イベント
    inputs.budget.addEventListener('input', function() {
        const value = this.value.trim();
        preview.sections[4].textContent = value || '予算を入力してください';
        animateElement(preview.sections[4].parentElement);
    });

    console.log('リアルタイムプレビュー機能を有効化しました');
}

// ========================================
// テンプレート切り替え機能
// ========================================
function setupTemplateSwitch() {
    // テンプレート選択ボタンを全て取得
    const templateButtons = document.querySelectorAll('.template-btn');

    // プレビューエリア（ドキュメント）を取得
    const proposalPreview = document.getElementById('proposal-preview');

    // 各ボタンにクリックイベントを追加
    templateButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // どのテンプレートが選択されたか取得
            const templateName = this.getAttribute('data-template');

            console.log('テンプレート切り替え:', templateName);

            // 全てのボタンから「active」クラスを削除
            templateButtons.forEach(function(btn) {
                btn.classList.remove('active');
            });

            // クリックされたボタンに「active」クラスを追加
            this.classList.add('active');

            // プレビューエリアのクラスを変更
            // まず全てのテンプレートクラスを削除
            proposalPreview.classList.remove('modern', 'professional', 'creative');

            // 新しいテンプレートクラスを追加
            proposalPreview.classList.add(templateName);

            // テンプレート切り替え時のアニメーション
            animateTemplateChange(proposalPreview);
        });
    });

    console.log('テンプレート切り替え機能を有効化しました');
}

// ========================================
// アニメーション効果
// ========================================

// 要素をアニメーションさせる関数
function animateElement(element) {
    // 一度クラスを削除してから追加することで、アニメーションをリセット
    element.style.animation = 'none';

    // ブラウザに変更を認識させるために少し待つ
    setTimeout(function() {
        element.style.animation = 'pulse 0.4s ease';
    }, 10);
}

// テンプレート切り替え時のアニメーション
function animateTemplateChange(element) {
    // フェードイン効果を追加
    element.style.animation = 'none';

    setTimeout(function() {
        element.style.animation = 'documentAppear 0.5s ease-out';
    }, 10);
}

// ========================================
// CSSアニメーション定義（JavaScriptから動的に追加）
// ========================================

// パルスアニメーションのスタイルを追加
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.02);
        }
        100% {
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);

// ========================================
// デバッグ用の便利な関数
// ========================================

// 現在の企画書データを取得する関数
function getProposalData() {
    return {
        title: document.getElementById('proposal-title').value,
        subtitle: document.getElementById('proposal-subtitle').value,
        objective: document.getElementById('proposal-objective').value,
        target: document.getElementById('proposal-target').value,
        content: document.getElementById('proposal-content').value,
        benefits: document.getElementById('proposal-benefits').value,
        budget: document.getElementById('proposal-budget').value
    };
}

// コンソールで使える便利な関数
// 使い方: ブラウザのコンソールで showData() と入力
function showData() {
    console.log('現在の企画書データ:', getProposalData());
}

console.log('💡 ヒント: コンソールで showData() と入力すると、現在の入力内容が確認できます');
