<#
Agrega la foto de un producto al proyecto y la publica.

Uso (desde C:\Proyectos\kaori):
  powershell -ExecutionPolicy Bypass -File scripts\agregar-foto.ps1 -Nombre te-verde.png
  powershell -ExecutionPolicy Bypass -File scripts\agregar-foto.ps1 -Nombre te-verde.png -Archivo "C:\ruta\foto.png"
  Agregar -Reemplazar si la foto ya existe y la querés cambiar.

Sin -Archivo toma la imagen mas reciente de la carpeta Descargas.
#>
param(
  [Parameter(Mandatory = $true)][string]$Nombre,
  [string]$Archivo,
  [switch]$Reemplazar
)

$ErrorActionPreference = "Continue"
$extensiones = @(".png", ".jpg", ".jpeg", ".webp", ".avif")

$repo = Split-Path -Parent $PSScriptRoot
Set-Location $repo

if (-not (Test-Path ".git") -or -not (Test-Path "public\images\products")) {
  Write-Host "ERROR: ejecuta este script desde el proyecto Kaori (C:\Proyectos\kaori)." -ForegroundColor Red
  exit 1
}

# 1) Archivo de origen
if ([string]::IsNullOrWhiteSpace($Archivo)) {
  $descargas = Join-Path $HOME "Downloads"
  $ultimo = Get-ChildItem -Path $descargas -File |
    Where-Object { $extensiones -contains $_.Extension.ToLower() } |
    Sort-Object LastWriteTime -Descending |
    Select-Object -First 1

  if ($null -eq $ultimo) {
    Write-Host "ERROR: no encontre imagenes en Descargas. Usa -Archivo con la ruta completa." -ForegroundColor Red
    exit 1
  }

  Write-Host ("Imagen mas reciente en Descargas: {0} ({1})" -f $ultimo.Name, $ultimo.LastWriteTime)
  $respuesta = Read-Host "Usar este archivo? (S/N)"
  if ($respuesta.Trim().ToUpper() -ne "S") {
    Write-Host "Cancelado. No se cambio nada."
    exit 0
  }
  $origen = $ultimo.FullName
} else {
  $origen = $Archivo
}

if (-not (Test-Path $origen -PathType Leaf)) {
  Write-Host "ERROR: no existe el archivo: $origen" -ForegroundColor Red
  exit 1
}

$origenInfo = Get-Item $origen
$extOrigen = $origenInfo.Extension.ToLower()
if ($extensiones -notcontains $extOrigen) {
  Write-Host "ERROR: el archivo debe ser png, jpg, jpeg, webp o avif." -ForegroundColor Red
  exit 1
}

# 2) Nombre final: minusculas, sin tildes ni espacios
$final = $Nombre.Trim().ToLower()
$final = $final.Normalize([Text.NormalizationForm]::FormD)
$final = [regex]::Replace($final, "\p{Mn}", "")
$final = $final -replace "\s+", "-"
$final = $final -replace "[^a-z0-9._-]", ""

if ([IO.Path]::GetExtension($final) -eq "") {
  $final = $final + $extOrigen
}

if ([IO.Path]::GetExtension($final) -ne $extOrigen) {
  Write-Host ("ERROR: el nombre termina en {0} pero el archivo es {1}. Usa la misma extension." -f [IO.Path]::GetExtension($final), $extOrigen) -ForegroundColor Red
  exit 1
}

if ($final -notmatch "^[a-z0-9][a-z0-9._-]*\.(png|jpe?g|webp|avif)$") {
  Write-Host "ERROR: nombre no valido. Ejemplo: te-verde.png" -ForegroundColor Red
  exit 1
}

# 3) Tamano
if ($origenInfo.Length -gt 2MB) {
  Write-Host ("AVISO: la imagen pesa {0:N1} MB. Una foto grande hace mas lenta la pagina." -f ($origenInfo.Length / 1MB)) -ForegroundColor Yellow
  $respuesta = Read-Host "Continuar igual? (S/N)"
  if ($respuesta.Trim().ToUpper() -ne "S") {
    Write-Host "Cancelado. No se cambio nada."
    exit 0
  }
}

# 4) Destino
$destinoRelativo = "public\images\products\$final"
$destino = Join-Path $repo $destinoRelativo

if ((Test-Path $destino) -and (-not $Reemplazar)) {
  Write-Host "ERROR: ya existe $final. Si queres cambiarla, agrega -Reemplazar." -ForegroundColor Red
  exit 1
}

$accion = "Agrega"
if (Test-Path $destino) { $accion = "Reemplaza" }

Copy-Item -Path $origen -Destination $destino -Force

# 5) Commit y push solo de ese archivo
git add -- $destinoRelativo
if ($LASTEXITCODE -ne 0) { Write-Host "ERROR en git add." -ForegroundColor Red; exit 1 }

git commit -m "$accion foto de producto: $final" -- $destinoRelativo
if ($LASTEXITCODE -ne 0) {
  Write-Host "ERROR en git commit (si no hay cambios, la foto ya era identica)." -ForegroundColor Red
  exit 1
}

git push
if ($LASTEXITCODE -ne 0) { Write-Host "ERROR en git push. La foto quedo commiteada pero no subida." -ForegroundColor Red; exit 1 }

Write-Host ""
Write-Host "Listo. Foto publicada: $final" -ForegroundColor Green
Write-Host "En la planilla, columna imagen, escribi exactamente: $final"
Write-Host "Esperá 2 o 3 minutos a que Vercel termine de desplegar antes de completar la fila del producto."
