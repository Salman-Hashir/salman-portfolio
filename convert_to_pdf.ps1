$word = New-Object -ComObject Word.Application
$word.Visible = $false
$folder = "d:\APP\portfolio\salman-portfolio-final\salman-portfolio-v2\books"
Get-ChildItem -Path $folder -Filter *.docx | ForEach-Object {
    if (-not $_.Name.StartsWith("~")) {
        $pdfPath = [System.IO.Path]::ChangeExtension($_.FullName, ".pdf")
        if (-Not (Test-Path $pdfPath)) {
            Write-Host "Converting $($_.Name) to PDF..."
            $doc = $word.Documents.Open($_.FullName)
            $doc.SaveAs([ref]$pdfPath, [ref]17)
            $doc.Close()
            Write-Host "Done converting $($_.Name)"
        } else {
            Write-Host "PDF already exists for $($_.Name)"
        }
    }
}
$word.Quit()
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null
