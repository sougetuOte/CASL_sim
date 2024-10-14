# テストを実行
npm test

# 結果を表示
if ($LASTEXITCODE -eq 0) {
    Write-Host "All tests passed!" -ForegroundColor Green
} else {
    Write-Host "Some tests failed. Check the output above for details." -ForegroundColor Red
}
