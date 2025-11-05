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

    // Phase 2: 画像アップロード機能をセットアップ
    setupImageUpload();

    // Phase 2: カラーカスタマイズ機能をセットアップ
    setupColorCustomizer();

    // Phase 2: アクションボタン（保存・読み込み・PDF出力・クリア）をセットアップ
    setupActionButtons();

    // Phase 2: 自動保存機能をセットアップ
    setupAutoSave();

    // Phase 2: 保存されたデータを読み込む
    loadSavedData();

    // Phase 3: フォント選択機能をセットアップ
    setupFontSelector();

    // Phase 3: セクション管理機能をセットアップ
    setupSectionManager();

    // Phase 3: グラフ挿入機能をセットアップ
    setupChartInsertion();

    // Phase 3: イラスト挿入機能をセットアップ
    setupIllustrationInsertion();
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
    // 画像データも取得
    const docImage = document.getElementById('doc-image');
    const imageData = docImage.src && docImage.src !== '' ? docImage.src : null;

    // アクティブなテンプレートを取得
    const activeTemplate = document.querySelector('.template-btn.active');
    const template = activeTemplate ? activeTemplate.getAttribute('data-template') : 'modern';

    // カスタムカラーを取得
    const primaryColor = document.getElementById('primary-color').value;
    const secondaryColor = document.getElementById('secondary-color').value;

    return {
        title: document.getElementById('proposal-title').value,
        subtitle: document.getElementById('proposal-subtitle').value,
        objective: document.getElementById('proposal-objective').value,
        target: document.getElementById('proposal-target').value,
        content: document.getElementById('proposal-content').value,
        benefits: document.getElementById('proposal-benefits').value,
        budget: document.getElementById('proposal-budget').value,
        image: imageData,
        template: template,
        primaryColor: primaryColor,
        secondaryColor: secondaryColor
    };
}

// コンソールで使える便利な関数
// 使い方: ブラウザのコンソールで showData() と入力
function showData() {
    console.log('現在の企画書データ:', getProposalData());
}

console.log('💡 ヒント: コンソールで showData() と入力すると、現在の入力内容が確認できます');

// ========================================
// Phase 2: 画像アップロード機能
// ========================================
function setupImageUpload() {
    const imageInput = document.getElementById('proposal-image');
    const imagePreviewContainer = document.getElementById('image-preview-container');
    const imagePreview = document.getElementById('image-preview');
    const removeImageBtn = document.getElementById('remove-image-btn');
    const docImageContainer = document.getElementById('doc-image-container');
    const docImage = document.getElementById('doc-image');

    // 画像が選択された時の処理
    imageInput.addEventListener('change', function(event) {
        const file = event.target.files[0];

        if (file && file.type.startsWith('image/')) {
            // FileReaderを使って画像を読み込む
            const reader = new FileReader();

            reader.onload = function(e) {
                const imageData = e.target.result;

                // プレビューエリアに画像を表示
                imagePreview.src = imageData;
                imagePreviewContainer.style.display = 'block';

                // ドキュメントプレビューに画像を表示
                docImage.src = imageData;
                docImageContainer.style.display = 'block';

                console.log('画像をアップロードしました');
            };

            reader.readAsDataURL(file);
        }
    });

    // 画像削除ボタンの処理
    removeImageBtn.addEventListener('click', function() {
        // 画像をクリア
        imageInput.value = '';
        imagePreview.src = '';
        imagePreviewContainer.style.display = 'none';
        docImage.src = '';
        docImageContainer.style.display = 'none';

        console.log('画像を削除しました');
    });

    console.log('画像アップロード機能を有効化しました');
}

// ========================================
// Phase 2: カラーカスタマイズ機能
// ========================================
function setupColorCustomizer() {
    const primaryColorPicker = document.getElementById('primary-color');
    const secondaryColorPicker = document.getElementById('secondary-color');
    const resetColorBtn = document.getElementById('reset-color-btn');
    const proposalPreview = document.getElementById('proposal-preview');

    // カスタムカラーを適用する関数
    function applyCustomColors(primary, secondary) {
        const gradient = `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`;

        // ヘッダーの背景グラデーションを変更
        const docHeader = proposalPreview.querySelector('.doc-header');
        docHeader.style.background = gradient.replace('135deg', '135deg') + ', rgba(255, 255, 255, 0.05)';
        docHeader.style.borderBottomColor = primary;

        // タイトルのグラデーションを変更
        const docTitle = proposalPreview.querySelector('.doc-title');
        docTitle.style.background = gradient;
        docTitle.style.webkitBackgroundClip = 'text';
        docTitle.style.webkitTextFillColor = 'transparent';
        docTitle.style.backgroundClip = 'text';

        // セクションタイトルの色を変更
        const sectionTitles = proposalPreview.querySelectorAll('.section-title');
        sectionTitles.forEach(function(title) {
            title.style.color = primary;
        });

        // セクションの左ボーダーを変更
        const sections = proposalPreview.querySelectorAll('.doc-section');
        sections.forEach(function(section) {
            section.style.borderLeftColor = primary;
        });
    }

    // メインカラー変更時
    primaryColorPicker.addEventListener('input', function() {
        const primary = this.value;
        const secondary = secondaryColorPicker.value;
        applyCustomColors(primary, secondary);
    });

    // アクセントカラー変更時
    secondaryColorPicker.addEventListener('input', function() {
        const primary = primaryColorPicker.value;
        const secondary = this.value;
        applyCustomColors(primary, secondary);
    });

    // デフォルトに戻すボタン
    resetColorBtn.addEventListener('click', function() {
        // 現在のテンプレートを取得
        const activeTemplate = document.querySelector('.template-btn.active');
        const templateName = activeTemplate ? activeTemplate.getAttribute('data-template') : 'modern';

        // テンプレートごとのデフォルトカラー
        const defaultColors = {
            modern: { primary: '#667eea', secondary: '#764ba2' },
            professional: { primary: '#2c3e50', secondary: '#34495e' },
            creative: { primary: '#ff6b6b', secondary: '#feca57' }
        };

        const colors = defaultColors[templateName] || defaultColors.modern;
        primaryColorPicker.value = colors.primary;
        secondaryColorPicker.value = colors.secondary;

        // カスタムスタイルをリセット
        const docHeader = proposalPreview.querySelector('.doc-header');
        const docTitle = proposalPreview.querySelector('.doc-title');
        const sectionTitles = proposalPreview.querySelectorAll('.section-title');
        const sections = proposalPreview.querySelectorAll('.doc-section');

        docHeader.style.background = '';
        docHeader.style.borderBottomColor = '';
        docTitle.style.background = '';
        docTitle.style.webkitBackgroundClip = '';
        docTitle.style.webkitTextFillColor = '';
        docTitle.style.backgroundClip = '';

        sectionTitles.forEach(function(title) {
            title.style.color = '';
        });

        sections.forEach(function(section) {
            section.style.borderLeftColor = '';
        });

        console.log('カラーをデフォルトに戻しました');
    });

    console.log('カラーカスタマイズ機能を有効化しました');
}

// ========================================
// Phase 2: アクションボタン機能
// ========================================
function setupActionButtons() {
    const saveBtn = document.getElementById('save-btn');
    const loadBtn = document.getElementById('load-btn');
    const pdfBtn = document.getElementById('pdf-btn');
    const clearBtn = document.getElementById('clear-btn');
    const saveStatus = document.getElementById('save-status');

    // 保存ボタン
    saveBtn.addEventListener('click', function() {
        saveProposalData();
        showSaveStatus('保存しました！', 'success');
    });

    // 読み込みボタン
    loadBtn.addEventListener('click', function() {
        loadSavedData();
        showSaveStatus('読み込みました！', 'success');
    });

    // PDF出力ボタン
    pdfBtn.addEventListener('click', function() {
        exportToPDF();
    });

    // クリアボタン
    clearBtn.addEventListener('click', function() {
        if (confirm('すべての入力内容をクリアしますか？')) {
            clearAllData();
            showSaveStatus('クリアしました', 'success');
        }
    });

    // 保存ステータスを表示する関数
    function showSaveStatus(message, type) {
        saveStatus.textContent = message;
        saveStatus.className = 'save-status ' + type;

        // 3秒後に消す
        setTimeout(function() {
            saveStatus.textContent = '';
            saveStatus.className = 'save-status';
        }, 3000);
    }

    console.log('アクションボタン機能を有効化しました');
}

// ========================================
// Phase 2: ローカルストレージ保存機能
// ========================================

// データを保存
function saveProposalData() {
    const data = getProposalData();
    localStorage.setItem('proposalData', JSON.stringify(data));
    console.log('データを保存しました', data);
}

// データを読み込み
function loadSavedData() {
    const savedData = localStorage.getItem('proposalData');

    if (savedData) {
        const data = JSON.parse(savedData);
        console.log('保存されたデータを読み込みました', data);

        // テキストフィールドに値をセット
        document.getElementById('proposal-title').value = data.title || '';
        document.getElementById('proposal-subtitle').value = data.subtitle || '';
        document.getElementById('proposal-objective').value = data.objective || '';
        document.getElementById('proposal-target').value = data.target || '';
        document.getElementById('proposal-content').value = data.content || '';
        document.getElementById('proposal-benefits').value = data.benefits || '';
        document.getElementById('proposal-budget').value = data.budget || '';

        // プレビューを更新（各入力イベントをトリガー）
        document.getElementById('proposal-title').dispatchEvent(new Event('input'));
        document.getElementById('proposal-subtitle').dispatchEvent(new Event('input'));
        document.getElementById('proposal-objective').dispatchEvent(new Event('input'));
        document.getElementById('proposal-target').dispatchEvent(new Event('input'));
        document.getElementById('proposal-content').dispatchEvent(new Event('input'));
        document.getElementById('proposal-benefits').dispatchEvent(new Event('input'));
        document.getElementById('proposal-budget').dispatchEvent(new Event('input'));

        // 画像を復元
        if (data.image) {
            const docImage = document.getElementById('doc-image');
            const docImageContainer = document.getElementById('doc-image-container');
            const imagePreview = document.getElementById('image-preview');
            const imagePreviewContainer = document.getElementById('image-preview-container');

            docImage.src = data.image;
            docImageContainer.style.display = 'block';
            imagePreview.src = data.image;
            imagePreviewContainer.style.display = 'block';
        }

        // テンプレートを復元
        if (data.template) {
            const templateButtons = document.querySelectorAll('.template-btn');
            templateButtons.forEach(function(btn) {
                btn.classList.remove('active');
                if (btn.getAttribute('data-template') === data.template) {
                    btn.click();
                }
            });
        }

        // カスタムカラーを復元
        if (data.primaryColor && data.secondaryColor) {
            document.getElementById('primary-color').value = data.primaryColor;
            document.getElementById('secondary-color').value = data.secondaryColor;

            // カラーを適用
            const event = new Event('input');
            document.getElementById('primary-color').dispatchEvent(event);
        }
    } else {
        console.log('保存されたデータはありません');
    }
}

// すべてのデータをクリア
function clearAllData() {
    // フォームをクリア
    document.getElementById('proposal-title').value = '';
    document.getElementById('proposal-subtitle').value = '';
    document.getElementById('proposal-objective').value = '';
    document.getElementById('proposal-target').value = '';
    document.getElementById('proposal-content').value = '';
    document.getElementById('proposal-benefits').value = '';
    document.getElementById('proposal-budget').value = '';

    // 画像をクリア
    document.getElementById('proposal-image').value = '';
    document.getElementById('image-preview').src = '';
    document.getElementById('image-preview-container').style.display = 'none';
    document.getElementById('doc-image').src = '';
    document.getElementById('doc-image-container').style.display = 'none';

    // プレビューをリセット
    document.querySelector('.doc-title').textContent = 'タイトルを入力してください';
    document.querySelector('.doc-subtitle').textContent = 'サブタイトルを入力してください';
    const sections = document.querySelectorAll('.section-content');
    sections[0].textContent = '企画の目的を入力してください';
    sections[1].textContent = 'ターゲットを入力してください';
    sections[2].textContent = '企画内容を入力してください';
    sections[3].textContent = '期待される効果を入力してください';
    sections[4].textContent = '予算を入力してください';

    // ローカルストレージもクリア
    localStorage.removeItem('proposalData');

    console.log('すべてのデータをクリアしました');
}

// ========================================
// Phase 2: 自動保存機能
// ========================================
function setupAutoSave() {
    // すべての入力フィールドを取得
    const inputs = document.querySelectorAll('input, textarea');

    // 5秒ごとに自動保存
    setInterval(function() {
        // 何か入力されていれば自動保存
        const data = getProposalData();
        if (data.title || data.subtitle || data.objective) {
            saveProposalData();
            console.log('自動保存しました');
        }
    }, 5000); // 5秒ごと

    console.log('自動保存機能を有効化しました（5秒ごと）');
}

// ========================================
// Phase 2: PDF出力機能
// ========================================
function exportToPDF() {
    console.log('PDF出力を開始します...');

    const previewElement = document.getElementById('proposal-preview');
    const pdfBtn = document.getElementById('pdf-btn');

    // ボタンを無効化
    pdfBtn.disabled = true;
    pdfBtn.textContent = '📄 PDF生成中...';

    // html2canvasを使ってHTMLを画像に変換
    html2canvas(previewElement, {
        scale: 2, // 高解像度
        useCORS: true, // 画像の読み込みを許可
        backgroundColor: '#ffffff'
    }).then(function(canvas) {
        // jsPDFを使ってPDFを生成
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jspdf.jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        const imgWidth = 210; // A4の幅（mm）
        const pageHeight = 297; // A4の高さ（mm）
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        // 最初のページを追加
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // 複数ページが必要な場合
        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        // PDFをダウンロード
        const title = document.getElementById('proposal-title').value || '企画書';
        pdf.save(title + '.pdf');

        // ボタンを元に戻す
        pdfBtn.disabled = false;
        pdfBtn.textContent = '📄 PDFで出力';

        console.log('PDFを出力しました');

        // 成功メッセージを表示
        const saveStatus = document.getElementById('save-status');
        saveStatus.textContent = 'PDFをダウンロードしました！';
        saveStatus.className = 'save-status success';
        setTimeout(function() {
            saveStatus.textContent = '';
            saveStatus.className = 'save-status';
        }, 3000);
    }).catch(function(error) {
        console.error('PDF生成エラー:', error);

        // エラーメッセージを表示
        const saveStatus = document.getElementById('save-status');
        saveStatus.textContent = 'PDF生成に失敗しました';
        saveStatus.className = 'save-status error';

        // ボタンを元に戻す
        pdfBtn.disabled = false;
        pdfBtn.textContent = '📄 PDFで出力';

        setTimeout(function() {
            saveStatus.textContent = '';
            saveStatus.className = 'save-status';
        }, 3000);
    });
}

// ========================================
// Phase 3: フォント選択機能
// ========================================
function setupFontSelector() {
    const fontSelector = document.getElementById('font-selector');
    const proposalPreview = document.getElementById('proposal-preview');

    fontSelector.addEventListener('change', function() {
        const selectedFont = this.value;

        // 既存のフォントクラスを削除
        proposalPreview.classList.remove(
            'font-default',
            'font-noto-sans',
            'font-noto-serif',
            'font-mplus-rounded',
            'font-zen-maru',
            'font-poppins'
        );

        // 新しいフォントクラスを追加
        if (selectedFont !== 'default') {
            proposalPreview.classList.add('font-' + selectedFont);
        }

        console.log('フォントを変更しました:', selectedFont);
    });

    console.log('フォント選択機能を有効化しました');
}

// ========================================
// Phase 3: セクション管理機能
// ========================================

// セクション番号のカウンター
let sectionCounter = 6; // 既存の5セクション + 予算

function setupSectionManager() {
    const addSectionBtn = document.getElementById('add-section-btn');
    const removeSectionBtn = document.getElementById('remove-section-btn');

    // セクション追加ボタン
    addSectionBtn.addEventListener('click', function() {
        addNewSection();
    });

    // セクション削除ボタン
    removeSectionBtn.addEventListener('click', function() {
        removeLastSection();
    });

    console.log('セクション管理機能を有効化しました');
}

// 新しいセクションを追加
function addNewSection() {
    const proposalPreview = document.getElementById('proposal-preview');
    sectionCounter++;

    // 新しいセクションを作成
    const newSection = document.createElement('div');
    newSection.className = 'doc-section';
    newSection.setAttribute('data-section-id', sectionCounter);
    newSection.innerHTML = `
        <h2 class="section-title">📝 セクション ${sectionCounter}</h2>
        <p class="section-content" contenteditable="true">ここに内容を入力してください（直接編集可能）</p>
    `;

    // プレビューエリアに追加
    proposalPreview.appendChild(newSection);

    // アニメーション
    newSection.style.animation = 'fadeIn 0.5s ease';

    console.log('セクションを追加しました:', sectionCounter);
}

// 最後のセクションを削除
function removeLastSection() {
    const proposalPreview = document.getElementById('proposal-preview');
    const sections = proposalPreview.querySelectorAll('.doc-section');

    // 最低5つのセクションは残す
    if (sections.length > 5) {
        const lastSection = sections[sections.length - 1];
        lastSection.style.animation = 'fadeOut 0.3s ease';

        setTimeout(function() {
            proposalPreview.removeChild(lastSection);
            console.log('セクションを削除しました');
        }, 300);
    } else {
        alert('これ以上セクションを削除できません（最低5つ必要）');
    }
}

// fadeOutアニメーション
const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(-20px);
        }
    }
`;
document.head.appendChild(fadeOutStyle);

// ========================================
// Phase 3: グラフ挿入機能
// ========================================

let chartCounter = 0; // グラフのカウンター

function setupChartInsertion() {
    const insertChartBtn = document.getElementById('insert-chart-btn');
    const chartModal = document.getElementById('chart-modal');
    const closeChartModal = document.getElementById('close-chart-modal');
    const createChartBtn = document.getElementById('create-chart-btn');

    // グラフ挿入ボタン
    insertChartBtn.addEventListener('click', function() {
        chartModal.style.display = 'block';
    });

    // モーダルを閉じる
    closeChartModal.addEventListener('click', function() {
        chartModal.style.display = 'none';
    });

    // モーダル外クリックで閉じる
    window.addEventListener('click', function(event) {
        if (event.target === chartModal) {
            chartModal.style.display = 'none';
        }
    });

    // グラフ作成ボタン
    createChartBtn.addEventListener('click', function() {
        createChart();
        chartModal.style.display = 'none';
    });

    console.log('グラフ挿入機能を有効化しました');
}

// グラフを作成
function createChart() {
    const chartType = document.getElementById('chart-type').value;
    const chartTitle = document.getElementById('chart-title').value || 'グラフ';
    const labelsInput = document.getElementById('chart-labels').value;
    const dataInput = document.getElementById('chart-data').value;

    // データ検証
    if (!labelsInput || !dataInput) {
        alert('ラベルとデータを入力してください');
        return;
    }

    // データ解析
    const labels = labelsInput.split(',').map(function(item) { return item.trim(); });
    const data = dataInput.split(',').map(function(item) { return parseFloat(item.trim()); });

    if (labels.length !== data.length) {
        alert('ラベルとデータの数が一致しません');
        return;
    }

    chartCounter++;

    // グラフコンテナを作成
    const chartContainer = document.createElement('div');
    chartContainer.className = 'chart-container';
    chartContainer.setAttribute('data-chart-id', chartCounter);
    chartContainer.innerHTML = `
        <button class="remove-chart-btn" onclick="removeChart(${chartCounter})">✕</button>
        <h3 class="chart-title">${chartTitle}</h3>
        <canvas id="chart-${chartCounter}"></canvas>
    `;

    // プレビューエリアに追加
    const proposalPreview = document.getElementById('proposal-preview');
    proposalPreview.appendChild(chartContainer);

    // Chart.jsでグラフを描画
    const ctx = document.getElementById('chart-' + chartCounter).getContext('2d');

    // カラーパレット
    const colors = [
        'rgba(102, 126, 234, 0.8)',
        'rgba(255, 107, 107, 0.8)',
        'rgba(52, 211, 153, 0.8)',
        'rgba(254, 202, 87, 0.8)',
        'rgba(251, 146, 60, 0.8)'
    ];

    new Chart(ctx, {
        type: chartType,
        data: {
            labels: labels,
            datasets: [{
                label: chartTitle,
                data: data,
                backgroundColor: colors,
                borderColor: colors.map(function(color) {
                    return color.replace('0.8', '1');
                }),
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: chartType === 'pie' || chartType === 'doughnut'
                }
            }
        }
    });

    // 入力フィールドをクリア
    document.getElementById('chart-title').value = '';
    document.getElementById('chart-labels').value = '';
    document.getElementById('chart-data').value = '';

    console.log('グラフを作成しました:', chartCounter);
}

// グラフを削除
function removeChart(chartId) {
    const chartContainer = document.querySelector('[data-chart-id="' + chartId + '"]');
    if (chartContainer) {
        chartContainer.style.animation = 'fadeOut 0.3s ease';
        setTimeout(function() {
            chartContainer.remove();
            console.log('グラフを削除しました:', chartId);
        }, 300);
    }
}

// グローバルスコープに関数を追加（HTML内のonclickから呼べるように）
window.removeChart = removeChart;

// ========================================
// Phase 3: イラスト挿入機能
// ========================================

let illustrationCounter = 0; // イラストのカウンター

function setupIllustrationInsertion() {
    const insertIllustrationBtn = document.getElementById('insert-illustration-btn');
    const illustrationModal = document.getElementById('illustration-modal');
    const closeIllustrationModal = document.getElementById('close-illustration-modal');
    const illustrationItems = document.querySelectorAll('.illustration-item');

    // イラスト挿入ボタン
    insertIllustrationBtn.addEventListener('click', function() {
        illustrationModal.style.display = 'block';
    });

    // モーダルを閉じる
    closeIllustrationModal.addEventListener('click', function() {
        illustrationModal.style.display = 'none';
    });

    // モーダル外クリックで閉じる
    window.addEventListener('click', function(event) {
        if (event.target === illustrationModal) {
            illustrationModal.style.display = 'none';
        }
    });

    // イラストアイテムクリック
    illustrationItems.forEach(function(item) {
        item.addEventListener('click', function() {
            const illustrationType = this.getAttribute('data-type');
            insertIllustration(illustrationType);
            illustrationModal.style.display = 'none';
        });
    });

    console.log('イラスト挿入機能を有効化しました');
}

// イラストを挿入
function insertIllustration(type) {
    illustrationCounter++;

    // SVGイラストを生成
    const svg = generateIllustrationSVG(type);

    // イラストコンテナを作成
    const illustrationContainer = document.createElement('div');
    illustrationContainer.className = 'illustration-container';
    illustrationContainer.setAttribute('data-illustration-id', illustrationCounter);
    illustrationContainer.innerHTML = `
        <button class="remove-illustration-btn" onclick="removeIllustration(${illustrationCounter})">✕</button>
        ${svg}
    `;

    // プレビューエリアに追加
    const proposalPreview = document.getElementById('proposal-preview');
    proposalPreview.appendChild(illustrationContainer);

    console.log('イラストを挿入しました:', type);
}

// SVGイラストを生成
function generateIllustrationSVG(type) {
    const svgs = {
        success: `
            <svg class="illustration-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="80" fill="#34d399" opacity="0.2"/>
                <circle cx="100" cy="100" r="60" fill="#34d399" opacity="0.4"/>
                <path d="M 70 100 L 90 120 L 130 80" stroke="#059669" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `,
        growth: `
            <svg class="illustration-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <line x1="40" y1="160" x2="160" y2="160" stroke="#667eea" stroke-width="3"/>
                <line x1="40" y1="160" x2="40" y2="40" stroke="#667eea" stroke-width="3"/>
                <polyline points="50,140 70,120 90,110 110,80 130,60 150,40" stroke="#667eea" stroke-width="4" fill="none" stroke-linecap="round"/>
                <circle cx="50" cy="140" r="5" fill="#667eea"/>
                <circle cx="70" cy="120" r="5" fill="#667eea"/>
                <circle cx="90" cy="110" r="5" fill="#667eea"/>
                <circle cx="110" cy="80" r="5" fill="#667eea"/>
                <circle cx="130" cy="60" r="5" fill="#667eea"/>
                <circle cx="150" cy="40" r="5" fill="#667eea"/>
            </svg>
        `,
        target: `
            <svg class="illustration-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#ff6b6b" stroke-width="3"/>
                <circle cx="100" cy="100" r="60" fill="none" stroke="#ff6b6b" stroke-width="3"/>
                <circle cx="100" cy="100" r="40" fill="none" stroke="#ff6b6b" stroke-width="3"/>
                <circle cx="100" cy="100" r="20" fill="#ff6b6b"/>
                <line x1="100" y1="20" x2="100" y2="180" stroke="#ff6b6b" stroke-width="2"/>
                <line x1="20" y1="100" x2="180" y2="100" stroke="#ff6b6b" stroke-width="2"/>
            </svg>
        `,
        idea: `
            <svg class="illustration-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="80" r="40" fill="#feca57" opacity="0.3"/>
                <path d="M 100 40 Q 80 50 80 80 Q 80 110 100 120 Q 120 110 120 80 Q 120 50 100 40" fill="#feca57"/>
                <rect x="90" y="120" width="20" height="10" fill="#f59e0b" rx="2"/>
                <rect x="85" y="130" width="30" height="5" fill="#f59e0b" rx="2"/>
                <line x1="60" y1="60" x2="50" y2="50" stroke="#feca57" stroke-width="3" stroke-linecap="round"/>
                <line x1="140" y1="60" x2="150" y2="50" stroke="#feca57" stroke-width="3" stroke-linecap="round"/>
                <line x1="60" y1="100" x2="40" y2="100" stroke="#feca57" stroke-width="3" stroke-linecap="round"/>
                <line x1="140" y1="100" x2="160" y2="100" stroke="#feca57" stroke-width="3" stroke-linecap="round"/>
            </svg>
        `,
        team: `
            <svg class="illustration-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <circle cx="70" cy="70" r="20" fill="#667eea"/>
                <ellipse cx="70" cy="110" rx="30" ry="20" fill="#667eea" opacity="0.7"/>
                <circle cx="130" cy="70" r="20" fill="#764ba2"/>
                <ellipse cx="130" cy="110" rx="30" ry="20" fill="#764ba2" opacity="0.7"/>
                <circle cx="100" cy="90" r="20" fill="#8b5cf6"/>
                <ellipse cx="100" cy="130" rx="30" ry="20" fill="#8b5cf6" opacity="0.7"/>
            </svg>
        `,
        rocket: `
            <svg class="illustration-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="100" cy="40" rx="25" ry="35" fill="#667eea"/>
                <rect x="75" y="40" width="50" height="60" fill="#764ba2" rx="5"/>
                <path d="M 75 100 L 60 140 L 75 130 Z" fill="#ff6b6b"/>
                <path d="M 125 100 L 140 140 L 125 130 Z" fill="#ff6b6b"/>
                <circle cx="100" cy="60" r="8" fill="#feca57"/>
                <circle cx="100" cy="80" r="8" fill="#feca57"/>
                <path d="M 70 150 Q 60 170 50 180" stroke="#95a5a6" stroke-width="3" fill="none" stroke-linecap="round"/>
                <path d="M 100 155 Q 100 175 100 185" stroke="#95a5a6" stroke-width="3" fill="none" stroke-linecap="round"/>
                <path d="M 130 150 Q 140 170 150 180" stroke="#95a5a6" stroke-width="3" fill="none" stroke-linecap="round"/>
            </svg>
        `
    };

    return svgs[type] || svgs.success;
}

// イラストを削除
function removeIllustration(illustrationId) {
    const illustrationContainer = document.querySelector('[data-illustration-id="' + illustrationId + '"]');
    if (illustrationContainer) {
        illustrationContainer.style.animation = 'fadeOut 0.3s ease';
        setTimeout(function() {
            illustrationContainer.remove();
            console.log('イラストを削除しました:', illustrationId);
        }, 300);
    }
}

// グローバルスコープに関数を追加
window.removeIllustration = removeIllustration;
