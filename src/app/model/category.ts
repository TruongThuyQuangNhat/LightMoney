export interface Category {
    id: string;
    icon: string;
    name: string;
    color: string;
    type: "expenditure" | "revenue";
    isDefault: boolean;
    index?: number;
    typeIcon?: string;
}

export const listCategory: Category[] = [
    {
        id: "cda1a23b-c42d-4b8b-a3b9-6f5281f8b767",
        icon: "cash-outline",
        name: "Lương",
        color: "#009900",
        type: "revenue",
        isDefault: true,
        index: 0,
        typeIcon: "outline",
    },
    {
        id: "192cd8bd-7968-42c5-b9b7-e584becf0768",
        icon: "cafe-outline",
        name: "Cà phê",
        color: "#996600",
        type: "expenditure",
        isDefault: true,
        index: 0,
        typeIcon: "outline",
    },
    {
        id: "4f66d0f1-18a8-42f1-86cb-9abb69a26435",
        icon: "fast-food-outline",
        name: "Ăn vặt",
        color: "#ff3300",
        type: "expenditure",
        isDefault: true,
        index: 1,
        typeIcon: "outline",
    },
    {
        id: "25156491-3f5d-4e9a-903f-a4c65f0e8176",
        icon: "wallet-outline",
        name: "Thu nhập khác",
        color: "#00cc99",
        type: "revenue",
        isDefault: true,
        typeIcon: "outline",
        index: 1
    },
    {
        id: "37074433-b658-4456-9734-82a866e8ea40",
        icon: "flame-outline",
        name: "Nhiên liệu",
        color: "#9966ff",
        type: "expenditure",
        isDefault: true,
        index: 2,
        typeIcon: "outline",
    },
    {
        id: "4501bcaf-d5ce-45e5-8941-95f26eac5fe3",
        icon: "cart-outline",
        name: "Siêu thị",
        color: "#ff6600",
        type: "expenditure",
        isDefault: true,
        index: 3,
        typeIcon: "outline",
    },
    {
        id: "be35345b-cf48-4bb0-9b9c-47ff4cd75f41",
        icon: "gift-outline",
        name: "Tiền thưởng",
        color: "#cc33ff",
        type: "revenue",
        isDefault: true,
        typeIcon: "outline",
        index: 2,
    },
    {
        id: "91c6cd39-3887-4314-bc48-d92512064354",
        icon: "extension-puzzle-outline",
        name: "Tiền phụ cấp",
        color: "#6666ff",
        type: "revenue",
        isDefault: true,
        typeIcon: "outline",
        index: 3
    },
    {
        id: "277c5491-2aec-4236-9b7d-fd456a99b266",
        icon: "trending-up-outline",
        name: "Đầu tư",
        color: "#33cc33",
        type: "revenue",
        isDefault: true,
        typeIcon: "outline",
        index: 4
    },
    {
        id: "0b009d37-4a19-4018-bea4-767f05c024f1",
        icon: "people-outline",
        name: "Đám cưới, sinh nhật",
        color: "#ff66cc",
        type: "expenditure",
        isDefault: true,
        index: 4,
        typeIcon: "outline",
    },
    {
        id: "46295b8e-9231-4edf-a18e-e16f423d2357",
        icon: "medkit-outline",
        name: "Y tế",
        color: "#ff0000",
        type: "expenditure",
        isDefault: true,
        index: 5,
        typeIcon: "outline",
    },
    {
        id: "abd6fb7b-4124-4f5f-84f3-d6b21bbb2669",
        icon: "paw-outline",
        name: "Thú cưng",
        color: "#999966",
        type: "expenditure",
        isDefault: true,
        index: 6,
        typeIcon: "outline",
    },
    {
        id: "43194f93-4abb-4f81-91f2-4c84cbbee8f1",
        icon: "phone-portrait-outline",
        name: "Điện thoại",
        color: "#666699",
        type: "expenditure",
        isDefault: true,
        index: 7,
        typeIcon: "outline",
    },
    {
        id: "5f68ad93-581a-45cb-81e8-30b50418f7ea",
        icon: "bus-outline",
        name: "Phương tiện di chuyển",
        color: "#0066cc",
        type: "expenditure",
        isDefault: true,
        index: 8,
        typeIcon: "outline",
    },
    {
        id: "73817de0-b51e-43ea-895c-da3562163bad",
        icon: "construct-outline",
        name: "Dụng cụ",
        color: "#666633",
        type: "expenditure",
        isDefault: true,
        index: 9,
        typeIcon: "outline",
    },
    {
        id: "a11f2ea5-d49e-4f06-882e-bf39efc97eb0",
        icon: "restaurant-outline",
        name: "Ăn uống",
        color: "#cc3399",
        type: "expenditure",
        isDefault: true,
        index: 10,
        typeIcon: "outline",
    },
    {
        id: "6188bdc6-d6cb-4417-b41d-966b92dc9a5d",
        icon: "shapes-outline",
        name: "Đồ linh tinh",
        color: "#336699",
        type: "expenditure",
        isDefault: true,
        index: 11,
        typeIcon: "outline",
    },
    {
        id: "bb937d72-f79e-4ee4-be12-3777656b779d",
        icon: "water-outline",
        name: "Tiền nước",
        color: "#0099ff",
        type: "expenditure",
        isDefault: true,
        index: 12,
        typeIcon: "outline",
    },
    {
        id: "c86baf1c-eb7d-41d7-8d70-9daf1b24bfbf",
        icon: "wifi-outline",
        name: "Tiền internet",
        color: "#00ff00",
        type: "expenditure",
        isDefault: true,
        index: 13,
        typeIcon: "outline",
    },
    {
        id: "716cdc5c-0dc9-4af6-88ca-0e532838dca8",
        icon: "flash-outline",
        name: "Tiền điện",
        color: "#ffcc00",
        type: "expenditure",
        isDefault: true,
        index: 14,
        typeIcon: "outline",
    },
    {
        id: "94694841-599b-40a2-8b1b-d6ed2ac91816",
        icon: "shirt-outline",
        name: "Quần áo",
        color: "#006666",
        type: "expenditure",
        isDefault: true,
        index: 15,
        typeIcon: "outline",
    },
    {
        id: "156a4719-5aaa-44eb-b4bf-45fff4d5f3b4",
        icon: "footsteps-outline",
        name: "Giày dép",
        color: "#003300",
        type: "expenditure",
        isDefault: true,
        index: 16,
        typeIcon: "outline",
    },
    {
        id: "0d685de8-ad66-4f0d-92d2-cc23660ea4c4",
        icon: "home-outline",
        name: "Tiền nhà",
        color: "#cc3300",
        type: "expenditure",
        isDefault: true,
        index: 17,
        typeIcon: "outline",
    },
    {
        id: "10e2f299-0e24-496e-a43e-68043e309577",
        icon: "barbell-outline",
        name: "Thể thao",
        color: "#cc6600",
        type: "expenditure",
        isDefault: true,
        index: 18,
        typeIcon: "outline",
    },
    {
        id: "f571a28b-75e3-483e-aa8a-59f7583540a2",
        icon: "car-outline",
        name: "Tiền xe",
        color: "#cc0099",
        type: "expenditure",
        isDefault: true,
        index: 19,
        typeIcon: "outline",
    },
    {
        id: "acd53f58-ef03-4ef1-b780-8e543df7b5a4",
        icon: "school-outline",
        name: "Học phí",
        color: "#0099cc",
        type: "expenditure",
        isDefault: true,
        index: 20,
        typeIcon: "outline",
    },
    {
        id: "b37869ef-2317-450e-85de-47b8bdd2aca5",
        icon: "trash-outline",
        name: "Tiền rác",
        color: "#cc6699",
        type: "expenditure",
        isDefault: true,
        index: 21,
        typeIcon: "outline",
    },
    {
        id: "4cb5c0dd-47ca-414f-9202-6d0225374fb7",
        icon: "beer-outline",
        name: "Tiệc tùng",
        color: "#ff9966",
        type: "expenditure",
        isDefault: true,
        index: 22,
        typeIcon: "outline",
    },
    {
        id: "f58a1121-808a-4914-8b17-7eeac296e1bc",
        icon: "color-wand-outline",
        name: "Mỹ phẩm",
        color: "#cc66ff",
        type: "expenditure",
        isDefault: true,
        index: 23,
        typeIcon: "outline",
    },
]

export const categoryName: string[] = [
    'accessibility-outline',
    'accessibility-sharp',
    'accessibility',
    'add-circle-outline',
    'add-circle-sharp',
    'add-circle',
    'add-outline',
    'add-sharp',
    'add',
    'airplane-outline',
    'airplane-sharp',
    'airplane',
    'alarm-outline',
    'alarm-sharp',
    'alarm',
    'albums-outline',
    'albums-sharp',
    'albums',
    'alert-circle-outline',
    'alert-circle-sharp',
    'alert-circle',
    'alert-outline',
    'alert-sharp',
    'alert',
    'american-football-outline',
    'american-football-sharp',
    'american-football',
    'analytics-outline',
    'analytics-sharp',
    'analytics',
    'aperture-outline',
    'aperture-sharp',
    'aperture',
    'apps-outline',
    'apps-sharp',
    'apps',
    'archive-outline',
    'archive-sharp',
    'archive',
    'arrow-back-circle-outline',
    'arrow-back-circle-sharp',
    'arrow-back-circle',
    'arrow-back-outline',
    'arrow-back-sharp',
    'arrow-back',
    'arrow-down-circle-outline',
    'arrow-down-circle-sharp',
    'arrow-down-circle',
    'arrow-down-outline',
    'arrow-down-sharp',
    'arrow-down',
    'arrow-forward-circle-outline',
    'arrow-forward-circle-sharp',
    'arrow-forward-circle',
    'arrow-forward-outline',
    'arrow-forward-sharp',
    'arrow-forward',
    'arrow-redo-circle-outline',
    'arrow-redo-circle-sharp',
    'arrow-redo-circle',
    'arrow-redo-outline',
    'arrow-redo-sharp',
    'arrow-redo',
    'arrow-undo-circle-outline',
    'arrow-undo-circle-sharp',
    'arrow-undo-circle',
    'arrow-undo-outline',
    'arrow-undo-sharp',
    'arrow-undo',
    'arrow-up-circle-outline',
    'arrow-up-circle-sharp',
    'arrow-up-circle',
    'arrow-up-outline',
    'arrow-up-sharp',
    'arrow-up',
    'at-circle-outline',
    'at-circle-sharp',
    'at-circle',
    'at-outline',
    'at-sharp',
    'at',
    'attach-outline',
    'attach-sharp',
    'attach',
    'backspace-outline',
    'backspace-sharp',
    'backspace',
    'bag-add-outline',
    'bag-add-sharp',
    'bag-add',
    'bag-check-outline',
    'bag-check-sharp',
    'bag-check',
    'bag-handle-outline',
    'bag-handle-sharp',
    'bag-handle',
    'bag-outline',
    'bag-remove-outline',
    'bag-remove-sharp',
    'bag-remove',
    'bag-sharp',
    'bag',
    'balloon-outline',
    'balloon-sharp',
    'balloon',
    'ban-outline',
    'ban-sharp',
    'ban',
    'bandage-outline',
    'bandage-sharp',
    'bandage',
    'bar-chart-outline',
    'bar-chart-sharp',
    'bar-chart',
    'barbell-outline',
    'barbell-sharp',
    'barbell',
    'barcode-outline',
    'barcode-sharp',
    'barcode',
    'baseball-outline',
    'baseball-sharp',
    'baseball',
    'basket-outline',
    'basket-sharp',
    'basket',
    'basketball-outline',
    'basketball-sharp',
    'basketball',
    'battery-charging-outline',
    'battery-charging-sharp',
    'battery-charging',
    'battery-dead-outline',
    'battery-dead-sharp',
    'battery-dead',
    'battery-full-outline',
    'battery-full-sharp',
    'battery-full',
    'battery-half-outline',
    'battery-half-sharp',
    'battery-half',
    'beaker-outline',
    'beaker-sharp',
    'beaker',
    'bed-outline',
    'bed-sharp',
    'bed',
    'beer-outline',
    'beer-sharp',
    'beer',
    'bicycle-outline',
    'bicycle-sharp',
    'bicycle',
    'bluetooth-outline',
    'bluetooth-sharp',
    'bluetooth',
    'boat-outline',
    'boat-sharp',
    'boat',
    'body-outline',
    'body-sharp',
    'body',
    'bonfire-outline',
    'bonfire-sharp',
    'bonfire',
    'book-outline',
    'book-sharp',
    'book',
    'bookmark-outline',
    'bookmark-sharp',
    'bookmark',
    'bookmarks-outline',
    'bookmarks-sharp',
    'bookmarks',
    'bowling-ball-outline',
    'bowling-ball-sharp',
    'bowling-ball',
    'briefcase-outline',
    'briefcase-sharp',
    'briefcase',
    'browsers-outline',
    'browsers-sharp',
    'browsers',
    'brush-outline',
    'brush-sharp',
    'brush',
    'bug-outline',
    'bug-sharp',
    'bug',
    'build-outline',
    'build-sharp',
    'build',
    'bulb-outline',
    'bulb-sharp',
    'bulb',
    'bus-outline',
    'bus-sharp',
    'bus',
    'business-outline',
    'business-sharp',
    'business',
    'cafe-outline',
    'cafe-sharp',
    'cafe',
    'calculator-outline',
    'calculator-sharp',
    'calculator',
    'calendar-clear-outline',
    'calendar-clear-sharp',
    'calendar-clear',
    'calendar-number-outline',
    'calendar-number-sharp',
    'calendar-number',
    'calendar-outline',
    'calendar-sharp',
    'calendar',
    'call-outline',
    'call-sharp',
    'call',
    'camera-outline',
    'camera-reverse-outline',
    'camera-reverse-sharp',
    'camera-reverse',
    'camera-sharp',
    'camera',
    'car-outline',
    'car-sharp',
    'car-sport-outline',
    'car-sport-sharp',
    'car-sport',
    'car',
    'card-outline',
    'card-sharp',
    'card',
    'caret-back-circle-outline',
    'caret-back-circle-sharp',
    'caret-back-circle',
    'caret-back-outline',
    'caret-back-sharp',
    'caret-back',
    'caret-down-circle-outline',
    'caret-down-circle-sharp',
    'caret-down-circle',
    'caret-down-outline',
    'caret-down-sharp',
    'caret-down',
    'caret-forward-circle-outline',
    'caret-forward-circle-sharp',
    'caret-forward-circle',
    'caret-forward-outline',
    'caret-forward-sharp',
    'caret-forward',
    'caret-up-circle-outline',
    'caret-up-circle-sharp',
    'caret-up-circle',
    'caret-up-outline',
    'caret-up-sharp',
    'caret-up',
    'cart-outline',
    'cart-sharp',
    'cart',
    'cash-outline',
    'cash-sharp',
    'cash',
    'cellular-outline',
    'cellular-sharp',
    'cellular',
    'chatbox-ellipses-outline',
    'chatbox-ellipses-sharp',
    'chatbox-ellipses',
    'chatbox-outline',
    'chatbox-sharp',
    'chatbox',
    'chatbubble-ellipses-outline',
    'chatbubble-ellipses-sharp',
    'chatbubble-ellipses',
    'chatbubble-outline',
    'chatbubble-sharp',
    'chatbubble',
    'chatbubbles-outline',
    'chatbubbles-sharp',
    'chatbubbles',
    'checkbox-outline',
    'checkbox-sharp',
    'checkbox',
    'checkmark-circle-outline',
    'checkmark-circle-sharp',
    'checkmark-circle',
    'checkmark-done-circle-outline',
    'checkmark-done-circle-sharp',
    'checkmark-done-circle',
    'checkmark-done-outline',
    'checkmark-done-sharp',
    'checkmark-done',
    'checkmark-outline',
    'checkmark-sharp',
    'checkmark',
    'chevron-back-circle-outline',
    'chevron-back-circle-sharp',
    'chevron-back-circle',
    'chevron-back-outline',
    'chevron-back-sharp',
    'chevron-back',
    'chevron-collapse-outline',
    'chevron-collapse-sharp',
    'chevron-collapse',
    'chevron-down-circle-outline',
    'chevron-down-circle-sharp',
    'chevron-down-circle',
    'chevron-down-outline',
    'chevron-down-sharp',
    'chevron-down',
    'chevron-expand-outline',
    'chevron-expand-sharp',
    'chevron-expand',
    'chevron-forward-circle-outline',
    'chevron-forward-circle-sharp',
    'chevron-forward-circle',
    'chevron-forward-outline',
    'chevron-forward-sharp',
    'chevron-forward',
    'chevron-up-circle-outline',
    'chevron-up-circle-sharp',
    'chevron-up-circle',
    'chevron-up-outline',
    'chevron-up-sharp',
    'chevron-up',
    'clipboard-outline',
    'clipboard-sharp',
    'clipboard',
    'close-circle-outline',
    'close-circle-sharp',
    'close-circle',
    'close-outline',
    'close-sharp',
    'close',
    'cloud-circle-outline',
    'cloud-circle-sharp',
    'cloud-circle',
    'cloud-done-outline',
    'cloud-done-sharp',
    'cloud-done',
    'cloud-download-outline',
    'cloud-download-sharp',
    'cloud-download',
    'cloud-offline-outline',
    'cloud-offline-sharp',
    'cloud-offline',
    'cloud-outline',
    'cloud-sharp',
    'cloud-upload-outline',
    'cloud-upload-sharp',
    'cloud-upload',
    'cloud',
    'cloudy-night-outline',
    'cloudy-night-sharp',
    'cloudy-night',
    'cloudy-outline',
    'cloudy-sharp',
    'cloudy',
    'code-download-outline',
    'code-download-sharp',
    'code-download',
    'code-outline',
    'code-sharp',
    'code-slash-outline',
    'code-slash-sharp',
    'code-slash',
    'code-working-outline',
    'code-working-sharp',
    'code-working',
    'code',
    'cog-outline',
    'cog-sharp',
    'cog',
    'color-fill-outline',
    'color-fill-sharp',
    'color-fill',
    'color-filter-outline',
    'color-filter-sharp',
    'color-filter',
    'color-palette-outline',
    'color-palette-sharp',
    'color-palette',
    'color-wand-outline',
    'color-wand-sharp',
    'color-wand',
    'compass-outline',
    'compass-sharp',
    'compass',
    'construct-outline',
    'construct-sharp',
    'construct',
    'contract-outline',
    'contract-sharp',
    'contract',
    'contrast-outline',
    'contrast-sharp',
    'contrast',
    'copy-outline',
    'copy-sharp',
    'copy',
    'create-outline',
    'create-sharp',
    'create',
    'crop-outline',
    'crop-sharp',
    'crop',
    'cube-outline',
    'cube-sharp',
    'cube',
    'cut-outline',
    'cut-sharp',
    'cut',
    'desktop-outline',
    'desktop-sharp',
    'desktop',
    'diamond-outline',
    'diamond-sharp',
    'diamond',
    'dice-outline',
    'dice-sharp',
    'dice',
    'disc-outline',
    'disc-sharp',
    'disc',
    'document-attach-outline',
    'document-attach-sharp',
    'document-attach',
    'document-lock-outline',
    'document-lock-sharp',
    'document-lock',
    'document-outline',
    'document-sharp',
    'document-text-outline',
    'document-text-sharp',
    'document-text',
    'document',
    'documents-outline',
    'documents-sharp',
    'documents',
    'download-outline',
    'download-sharp',
    'download',
    'duplicate-outline',
    'duplicate-sharp',
    'duplicate',
    'ear-outline',
    'ear-sharp',
    'ear',
    'earth-outline',
    'earth-sharp',
    'earth',
    'easel-outline',
    'easel-sharp',
    'easel',
    'egg-outline',
    'egg-sharp',
    'egg',
    'ellipse-outline',
    'ellipse-sharp',
    'ellipse',
    'ellipsis-horizontal-circle-outline',
    'ellipsis-horizontal-circle-sharp',
    'ellipsis-horizontal-circle',
    'ellipsis-horizontal-outline',
    'ellipsis-horizontal-sharp',
    'ellipsis-horizontal',
    'ellipsis-vertical-circle-outline',
    'ellipsis-vertical-circle-sharp',
    'ellipsis-vertical-circle',
    'ellipsis-vertical-outline',
    'ellipsis-vertical-sharp',
    'ellipsis-vertical',
    'enter-outline',
    'enter-sharp',
    'enter',
    'exit-outline',
    'exit-sharp',
    'exit',
    'expand-outline',
    'expand-sharp',
    'expand',
    'extension-puzzle-outline',
    'extension-puzzle-sharp',
    'extension-puzzle',
    'eye-off-outline',
    'eye-off-sharp',
    'eye-off',
    'eye-outline',
    'eye-sharp',
    'eye',
    'eyedrop-outline',
    'eyedrop-sharp',
    'eyedrop',
    'fast-food-outline',
    'fast-food-sharp',
    'fast-food',
    'female-outline',
    'female-sharp',
    'female',
    'file-tray-full-outline',
    'file-tray-full-sharp',
    'file-tray-full',
    'file-tray-outline',
    'file-tray-sharp',
    'file-tray-stacked-outline',
    'file-tray-stacked-sharp',
    'file-tray-stacked',
    'file-tray',
    'film-outline',
    'film-sharp',
    'film',
    'filter-circle-outline',
    'filter-circle-sharp',
    'filter-circle',
    'filter-outline',
    'filter-sharp',
    'filter',
    'finger-print-outline',
    'finger-print-sharp',
    'finger-print',
    'fish-outline',
    'fish-sharp',
    'fish',
    'fitness-outline',
    'fitness-sharp',
    'fitness',
    'flag-outline',
    'flag-sharp',
    'flag',
    'flame-outline',
    'flame-sharp',
    'flame',
    'flash-off-outline',
    'flash-off-sharp',
    'flash-off',
    'flash-outline',
    'flash-sharp',
    'flash',
    'flashlight-outline',
    'flashlight-sharp',
    'flashlight',
    'flask-outline',
    'flask-sharp',
    'flask',
    'flower-outline',
    'flower-sharp',
    'flower',
    'folder-open-outline',
    'folder-open-sharp',
    'folder-open',
    'folder-outline',
    'folder-sharp',
    'folder',
    'football-outline',
    'football-sharp',
    'football',
    'footsteps-outline',
    'footsteps-sharp',
    'footsteps',
    'funnel-outline',
    'funnel-sharp',
    'funnel',
    'game-controller-outline',
    'game-controller-sharp',
    'game-controller',
    'gift-outline',
    'gift-sharp',
    'gift',
    'git-branch-outline',
    'git-branch-sharp',
    'git-branch',
    'git-commit-outline',
    'git-commit-sharp',
    'git-commit',
    'git-compare-outline',
    'git-compare-sharp',
    'git-compare',
    'git-merge-outline',
    'git-merge-sharp',
    'git-merge',
    'git-network-outline',
    'git-network-sharp',
    'git-network',
    'git-pull-request-outline',
    'git-pull-request-sharp',
    'git-pull-request',
    'glasses-outline',
    'glasses-sharp',
    'glasses',
    'globe-outline',
    'globe-sharp',
    'globe',
    'golf-outline',
    'golf-sharp',
    'golf',
    'grid-outline',
    'grid-sharp',
    'grid',
    'hammer-outline',
    'hammer-sharp',
    'hammer',
    'hand-left-outline',
    'hand-left-sharp',
    'hand-left',
    'hand-right-outline',
    'hand-right-sharp',
    'hand-right',
    'happy-outline',
    'happy-sharp',
    'happy',
    'hardware-chip-outline',
    'hardware-chip-sharp',
    'hardware-chip',
    'headset-outline',
    'headset-sharp',
    'headset',
    'heart-circle-outline',
    'heart-circle-sharp',
    'heart-circle',
    'heart-dislike-circle-outline',
    'heart-dislike-circle-sharp',
    'heart-dislike-circle',
    'heart-dislike-outline',
    'heart-dislike-sharp',
    'heart-dislike',
    'heart-half-outline',
    'heart-half-sharp',
    'heart-half',
    'heart-outline',
    'heart-sharp',
    'heart',
    'help-buoy-outline',
    'help-buoy-sharp',
    'help-buoy',
    'help-circle-outline',
    'help-circle-sharp',
    'help-circle',
    'help-outline',
    'help-sharp',
    'help',
    'home-outline',
    'home-sharp',
    'home',
    'hourglass-outline',
    'hourglass-sharp',
    'hourglass',
    'ice-cream-outline',
    'ice-cream-sharp',
    'ice-cream',
    'id-card-outline',
    'id-card-sharp',
    'id-card',
    'image-outline',
    'image-sharp',
    'image',
    'images-outline',
    'images-sharp',
    'images',
    'infinite-outline',
    'infinite-sharp',
    'infinite',
    'information-circle-outline',
    'information-circle-sharp',
    'information-circle',
    'information-outline',
    'information-sharp',
    'information',
    'invert-mode-outline',
    'invert-mode-sharp',
    'invert-mode',
    'journal-outline',
    'journal-sharp',
    'journal',
    'key-outline',
    'key-sharp',
    'key',
    'keypad-outline',
    'keypad-sharp',
    'keypad',
    'language-outline',
    'language-sharp',
    'language',
    'laptop-outline',
    'laptop-sharp',
    'laptop',
    'layers-outline',
    'layers-sharp',
    'layers',
    'leaf-outline',
    'leaf-sharp',
    'leaf',
    'library-outline',
    'library-sharp',
    'library',
    'link-outline',
    'link-sharp',
    'link',
    'list-circle-outline',
    'list-circle-sharp',
    'list-circle',
    'list-outline',
    'list-sharp',
    'list',
    'locate-outline',
    'locate-sharp',
    'locate',
    'location-outline',
    'location-sharp',
    'location',
    'lock-closed-outline',
    'lock-closed-sharp',
    'lock-closed',
    'lock-open-outline',
    'lock-open-sharp',
    'lock-open',
    'log-in-outline',
    'log-in-sharp',
    'log-in',
    'log-out-outline',
    'log-out-sharp',
    'log-out',
    'magnet-outline',
    'magnet-sharp',
    'magnet',
    'mail-open-outline',
    'mail-open-sharp',
    'mail-open',
    'mail-outline',
    'mail-sharp',
    'mail-unread-outline',
    'mail-unread-sharp',
    'mail-unread',
    'mail',
    'male-female-outline',
    'male-female-sharp',
    'male-female',
    'male-outline',
    'male-sharp',
    'male',
    'man-outline',
    'man-sharp',
    'man',
    'map-outline',
    'map-sharp',
    'map',
    'medal-outline',
    'medal-sharp',
    'medal',
    'medical-outline',
    'medical-sharp',
    'medical',
    'medkit-outline',
    'medkit-sharp',
    'medkit',
    'megaphone-outline',
    'megaphone-sharp',
    'megaphone',
    'menu-outline',
    'menu-sharp',
    'menu',
    'mic-circle-outline',
    'mic-circle-sharp',
    'mic-circle',
    'mic-off-circle-outline',
    'mic-off-circle-sharp',
    'mic-off-circle',
    'mic-off-outline',
    'mic-off-sharp',
    'mic-off',
    'mic-outline',
    'mic-sharp',
    'mic',
    'moon-outline',
    'moon-sharp',
    'moon',
    'move-outline',
    'move-sharp',
    'move',
    'musical-note-outline',
    'musical-note-sharp',
    'musical-note',
    'musical-notes-outline',
    'musical-notes-sharp',
    'musical-notes',
    'navigate-circle-outline',
    'navigate-circle-sharp',
    'navigate-circle',
    'navigate-outline',
    'navigate-sharp',
    'navigate',
    'newspaper-outline',
    'newspaper-sharp',
    'newspaper',
    'notifications-circle-outline',
    'notifications-circle-sharp',
    'notifications-circle',
    'notifications-off-circle-outline',
    'notifications-off-circle-sharp',
    'notifications-off-circle',
    'notifications-off-outline',
    'notifications-off-sharp',
    'notifications-off',
    'notifications-outline',
    'notifications-sharp',
    'notifications',
    'nuclear-outline',
    'nuclear-sharp',
    'nuclear',
    'nutrition-outline',
    'nutrition-sharp',
    'nutrition',
    'open-outline',
    'open-sharp',
    'open',
    'options-outline',
    'options-sharp',
    'options',
    'paper-plane-outline',
    'paper-plane-sharp',
    'paper-plane',
    'partly-sunny-outline',
    'partly-sunny-sharp',
    'partly-sunny',
    'pause-circle-outline',
    'pause-circle-sharp',
    'pause-circle',
    'pause-outline',
    'pause-sharp',
    'pause',
    'paw-outline',
    'paw-sharp',
    'paw',
    'pencil-outline',
    'pencil-sharp',
    'pencil',
    'people-circle-outline',
    'people-circle-sharp',
    'people-circle',
    'people-outline',
    'people-sharp',
    'people',
    'person-add-outline',
    'person-add-sharp',
    'person-add',
    'person-circle-outline',
    'person-circle-sharp',
    'person-circle',
    'person-outline',
    'person-remove-outline',
    'person-remove-sharp',
    'person-remove',
    'person-sharp',
    'person',
    'phone-landscape-outline',
    'phone-landscape-sharp',
    'phone-landscape',
    'phone-portrait-outline',
    'phone-portrait-sharp',
    'phone-portrait',
    'pie-chart-outline',
    'pie-chart-sharp',
    'pie-chart',
    'pin-outline',
    'pin-sharp',
    'pin',
    'pint-outline',
    'pint-sharp',
    'pint',
    'pizza-outline',
    'pizza-sharp',
    'pizza',
    'planet-outline',
    'planet-sharp',
    'planet',
    'play-back-circle-outline',
    'play-back-circle-sharp',
    'play-back-circle',
    'play-back-outline',
    'play-back-sharp',
    'play-back',
    'play-circle-outline',
    'play-circle-sharp',
    'play-circle',
    'play-forward-circle-outline',
    'play-forward-circle-sharp',
    'play-forward-circle',
    'play-forward-outline',
    'play-forward-sharp',
    'play-forward',
    'play-outline',
    'play-sharp',
    'play-skip-back-circle-outline',
    'play-skip-back-circle-sharp',
    'play-skip-back-circle',
    'play-skip-back-outline',
    'play-skip-back-sharp',
    'play-skip-back',
    'play-skip-forward-circle-outline',
    'play-skip-forward-circle-sharp',
    'play-skip-forward-circle',
    'play-skip-forward-outline',
    'play-skip-forward-sharp',
    'play-skip-forward',
    'play',
    'podium-outline',
    'podium-sharp',
    'podium',
    'power-outline',
    'power-sharp',
    'power',
    'pricetag-outline',
    'pricetag-sharp',
    'pricetag',
    'pricetags-outline',
    'pricetags-sharp',
    'pricetags',
    'print-outline',
    'print-sharp',
    'print',
    'prism-outline',
    'prism-sharp',
    'prism',
    'pulse-outline',
    'pulse-sharp',
    'pulse',
    'push-outline',
    'push-sharp',
    'push',
    'qr-code-outline',
    'qr-code-sharp',
    'qr-code',
    'radio-button-off-outline',
    'radio-button-off-sharp',
    'radio-button-off',
    'radio-button-on-outline',
    'radio-button-on-sharp',
    'radio-button-on',
    'radio-outline',
    'radio-sharp',
    'radio',
    'rainy-outline',
    'rainy-sharp',
    'rainy',
    'reader-outline',
    'reader-sharp',
    'reader',
    'receipt-outline',
    'receipt-sharp',
    'receipt',
    'recording-outline',
    'recording-sharp',
    'recording',
    'refresh-circle-outline',
    'refresh-circle-sharp',
    'refresh-circle',
    'refresh-outline',
    'refresh-sharp',
    'refresh',
    'reload-circle-outline',
    'reload-circle-sharp',
    'reload-circle',
    'reload-outline',
    'reload-sharp',
    'reload',
    'remove-circle-outline',
    'remove-circle-sharp',
    'remove-circle',
    'remove-outline',
    'remove-sharp',
    'remove',
    'reorder-four-outline',
    'reorder-four-sharp',
    'reorder-four',
    'reorder-three-outline',
    'reorder-three-sharp',
    'reorder-three',
    'reorder-two-outline',
    'reorder-two-sharp',
    'reorder-two',
    'repeat-outline',
    'repeat-sharp',
    'repeat',
    'resize-outline',
    'resize-sharp',
    'resize',
    'restaurant-outline',
    'restaurant-sharp',
    'restaurant',
    'return-down-back-outline',
    'return-down-back-sharp',
    'return-down-back',
    'return-down-forward-outline',
    'return-down-forward-sharp',
    'return-down-forward',
    'return-up-back-outline',
    'return-up-back-sharp',
    'return-up-back',
    'return-up-forward-outline',
    'return-up-forward-sharp',
    'return-up-forward',
    'ribbon-outline',
    'ribbon-sharp',
    'ribbon',
    'rocket-outline',
    'rocket-sharp',
    'rocket',
    'rose-outline',
    'rose-sharp',
    'rose',
    'sad-outline',
    'sad-sharp',
    'sad',
    'save-outline',
    'save-sharp',
    'save',
    'scale-outline',
    'scale-sharp',
    'scale',
    'scan-circle-outline',
    'scan-circle-sharp',
    'scan-circle',
    'scan-outline',
    'scan-sharp',
    'scan',
    'school-outline',
    'school-sharp',
    'school',
    'search-circle-outline',
    'search-circle-sharp',
    'search-circle',
    'search-outline',
    'search-sharp',
    'search',
    'send-outline',
    'send-sharp',
    'send',
    'server-outline',
    'server-sharp',
    'server',
    'settings-outline',
    'settings-sharp',
    'settings',
    'shapes-outline',
    'shapes-sharp',
    'shapes',
    'share-outline',
    'share-sharp',
    'share-social-outline',
    'share-social-sharp',
    'share-social',
    'share',
    'shield-checkmark-outline',
    'shield-checkmark-sharp',
    'shield-checkmark',
    'shield-half-outline',
    'shield-half-sharp',
    'shield-half',
    'shield-outline',
    'shield-sharp',
    'shield',
    'shirt-outline',
    'shirt-sharp',
    'shirt',
    'shuffle-outline',
    'shuffle-sharp',
    'shuffle',
    'skull-outline',
    'skull-sharp',
    'skull',
    'snow-outline',
    'snow-sharp',
    'snow',
    'sparkles-outline',
    'sparkles-sharp',
    'sparkles',
    'speedometer-outline',
    'speedometer-sharp',
    'speedometer',
    'square-outline',
    'square-sharp',
    'square',
    'star-half-outline',
    'star-half-sharp',
    'star-half',
    'star-outline',
    'star-sharp',
    'star',
    'stats-chart-outline',
    'stats-chart-sharp',
    'stats-chart',
    'stop-circle-outline',
    'stop-circle-sharp',
    'stop-circle',
    'stop-outline',
    'stop-sharp',
    'stop',
    'stopwatch-outline',
    'stopwatch-sharp',
    'stopwatch',
    'storefront-outline',
    'storefront-sharp',
    'storefront',
    'subway-outline',
    'subway-sharp',
    'subway',
    'sunny-outline',
    'sunny-sharp',
    'sunny',
    'swap-horizontal-outline',
    'swap-horizontal-sharp',
    'swap-horizontal',
    'swap-vertical-outline',
    'swap-vertical-sharp',
    'swap-vertical',
    'sync-circle-outline',
    'sync-circle-sharp',
    'sync-circle',
    'sync-outline',
    'sync-sharp',
    'sync',
    'tablet-landscape-outline',
    'tablet-landscape-sharp',
    'tablet-landscape',
    'tablet-portrait-outline',
    'tablet-portrait-sharp',
    'tablet-portrait',
    'telescope-outline',
    'telescope-sharp',
    'telescope',
    'tennisball-outline',
    'tennisball-sharp',
    'tennisball',
    'terminal-outline',
    'terminal-sharp',
    'terminal',
    'text-outline',
    'text-sharp',
    'text',
    'thermometer-outline',
    'thermometer-sharp',
    'thermometer',
    'thumbs-down-outline',
    'thumbs-down-sharp',
    'thumbs-down',
    'thumbs-up-outline',
    'thumbs-up-sharp',
    'thumbs-up',
    'thunderstorm-outline',
    'thunderstorm-sharp',
    'thunderstorm',
    'ticket-outline',
    'ticket-sharp',
    'ticket',
    'time-outline',
    'time-sharp',
    'time',
    'timer-outline',
    'timer-sharp',
    'timer',
    'today-outline',
    'today-sharp',
    'today',
    'toggle-outline',
    'toggle-sharp',
    'toggle',
    'trail-sign-outline',
    'trail-sign-sharp',
    'trail-sign',
    'train-outline',
    'train-sharp',
    'train',
    'transgender-outline',
    'transgender-sharp',
    'transgender',
    'trash-bin-outline',
    'trash-bin-sharp',
    'trash-bin',
    'trash-outline',
    'trash-sharp',
    'trash',
    'trending-down-outline',
    'trending-down-sharp',
    'trending-down',
    'trending-up-outline',
    'trending-up-sharp',
    'trending-up',
    'triangle-outline',
    'triangle-sharp',
    'triangle',
    'trophy-outline',
    'trophy-sharp',
    'trophy',
    'tv-outline',
    'tv-sharp',
    'tv',
    'umbrella-outline',
    'umbrella-sharp',
    'umbrella',
    'unlink-outline',
    'unlink-sharp',
    'unlink',
    'videocam-off-outline',
    'videocam-off-sharp',
    'videocam-off',
    'videocam-outline',
    'videocam-sharp',
    'videocam',
    'volume-high-outline',
    'volume-high-sharp',
    'volume-high',
    'volume-low-outline',
    'volume-low-sharp',
    'volume-low',
    'volume-medium-outline',
    'volume-medium-sharp',
    'volume-medium',
    'volume-mute-outline',
    'volume-mute-sharp',
    'volume-mute',
    'volume-off-outline',
    'volume-off-sharp',
    'volume-off',
    'walk-outline',
    'walk-sharp',
    'walk',
    'wallet-outline',
    'wallet-sharp',
    'wallet',
    'warning-outline',
    'warning-sharp',
    'warning',
    'watch-outline',
    'watch-sharp',
    'watch',
    'water-outline',
    'water-sharp',
    'water',
    'wifi-outline',
    'wifi-sharp',
    'wifi',
    'wine-outline',
    'wine-sharp',
    'wine',
    'woman-outline',
    'woman-sharp',
    'woman',
];

export const colorArray = [
    "#993333", "#800000", "#990000", "#993300", "#cc3300", "#996600", "#663300",
    "#996633", "#999966", "#666633", "#333300", "#336600", "#003300", "#006600",
    "#339933", "#339966", "#669999", "#006666", "#003366", "#336699", "#3366cc",
    "#003399", "#000099", "#0000cc", "#000066", "#333399", "#666699", "#6600cc",
    "#9900ff", "#9900cc", "#660066", "#993399", "#990099", "#993366", "#660033",
    "#990033", "#cc0000", "#ff0000", "#ff3300", "#cc6600", "#ff9900", "#cc9900",
    "#cccc00", "#99cc00", "#669900", "#009900", "#009933", "#00cc00", "#00cc66", 
    "#00cc99", "#009999", "#006699", "#0099cc", "#0066cc", "#0033cc", "#0000ff", 
    "#3333ff", "#3333cc", "#6600ff", "#9933ff", "#cc00ff", "#cc00cc", "#cc0099", 
    "#cc3399", "#cc6699", "#cc0066", "#ff5050", "#ff6600", "#ff9933", "#ffcc00", 
    "#ffff00", "#ccff33", "#99ff33", "#66ff33", "#33cc33", "#00ff00", "#00ff99", 
    "#00ffcc", "#33cccc", "#00ccff", "#0099ff", "#0066ff", "#3366ff", "#6666ff", 
    "#9966ff", "#cc33ff", "#ff00ff", "#ff33cc", "#ff3399", "#ff0066", "#ff6666", 
    "#ff9966", "#ffcc66", "#ffff66", "#ccff66", "#99ff66", "#66ff66", "#66ff99", 
    "#66ffcc", "#00ffff", "#33ccff", "#3399ff", "#6699ff", "#9999ff", "#cc66ff", 
    "#ff66ff", "#ff66cc", "#ff6699", "#ff9999", "#ffcc99", "#ffff99", "#ccff99", 
    "#99ff99", "#99ffcc", "#66ffff", "#66ccff", "#99ccff", "#cc99ff", "#ff99ff", 
    "#ff99cc", "#ffcccc", "#ffffcc", "#ccffcc", "#ccffff", "#ccccff", "#ffccff",
];