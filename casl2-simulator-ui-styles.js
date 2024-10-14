export function getStyles() {
    return `
        @import url('normalize.css');
        @import url('skeleton.css');
        @import url('styles.css');
        
        /* Additional styles specific to the shadow DOM */
        #casl2-simulator {
            padding: 20px;
        }
        #testResult {
            margin-top: 20px;
            padding: 10px;
            border: 1px solid #ddd;
            background-color: #f0f0f0;
            display: none;
        }
    `;
}
