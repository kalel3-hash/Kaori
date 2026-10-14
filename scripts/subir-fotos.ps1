<#
Sube a la pagina todas las fotos que haya en la carpeta fotos-nuevas.

Uso (desde C:\Proyectos\kaori):
  1) Copia las fotos a C:\Proyectos\kaori\fotos-nuevas
     (ponele a cada archivo el nombre final, por ejemplo te-verde.png)
  2) Hace doble clic en subir-fotos.cmd
     (o: powershell -ExecutionPolicy Bypass -File scripts\subir-fotos.ps1)

  -Reemplazar  cambia fotos que ya existen con el mismo nombre.

Las fotos publicadas se mueven a fotos-nuevas\subidas.
#>
param(
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

$entrada = Join-Path $repo "fotos-nuevas"
$subidas = Join-Path $entrada "subidas"
New-Item -ItemType Directory -Force -Path $entrada | Out-Null
New-Item -ItemType Directory -Force -Path $subidas | Out-Null

$archivos = @(Get-ChildItem -Path $entrada -File | Where-Object { $extensiones -contains $_.Extension.ToLower() })

if ($archivos.Count -eq 0) {
  Write-Host "No hay fotos en: $entrada" -ForegroundColor Yellow
  Write-Host "Copia ahi las fotos (png, jpg, jpeg, webp o avif) y volve a correr este script."
  exit 0
}

Write-Host ("Fotos encontradas: {0}" -f $archivos.Count)

$aSubir = @()
$nombresUsados = @{}
$errores = 0

foreach ($archivo in $archivos) {
  # Nombre final: minusculas, sin tildes ni espacios
  $final = $archivo.Name.Trim().ToLower()
  $final = $final.Normalize([Text.NormalizationForm]::FormD)
  $final = [regex]::Replace($final, "\p{Mn}", "")
  $final = $final -replace "\s+", "-"
  $final = $final -replace "[^a-z0-9._-]", ""

  if ($final -notmatch "^[a-z0-9][a-z0-9._-]*\.(png|jpe?g|webp|avif)$") {
    Write-Host ("  OMITIDA {0}: nombre no valido (ejemplo: te-verde.png)." -f $archivo.Name) -ForegroundColor Red
    $errores++
    continue
  }

  if ($nombresUsados.ContainsKey($final)) {
    Write-Host ("  OMITIDA {0}: queda con el mismo nombre final que otra foto ({1})." -f $archivo.Name, $final) -ForegroundColor Red
    $errores++
    continue
  }

  $destinoRelativo = "public/images/products/$final"
  $destino = Join-Path $repo $destinoRelativo
  $existe = Test-Path $destino

  if ($existe -and (-not $Reemplazar)) {
    Write-Host ("  OMITIDA {0}: ya existe {1}. Para cambiarla, corre con -Reemplazar." -f $archivo.Name, $final) -ForegroundColor Red
    $errores++
    continue
  }

  if ($archivo.Length -gt 2MB) {
    Write-Host ("  AVISO {0}: pesa {1:N1} MB. Una foto grande hace mas lenta la pagina." -f $archivo.Name, ($archivo.Length / 1MB)) -ForegroundColor Yellow
    $respuesta = Read-Host "  Subirla igual? (S/N)"
    if ($respuesta.Trim().ToUpper() -ne "S") {
      Write-Host ("  OMITIDA {0}." -f $archivo.Name)
      continue
    }
  }

  $nombresUsados[$final] = $true
  $accion = "Agrega"
  if ($existe) { $accion = "Reemplaza" }

  $aSubir += [pscustomobject]@{
    Origen   = $archivo.FullName
    Final    = $final
    Relativo = $destinoRelativo
    Destino  = $destino
    Accion   = $accion
  }
}

if ($aSubir.Count -eq 0) {
  Write-Host "No se subio nada." -ForegroundColor Yellow
  if ($errores -gt 0) { exit 1 }
  exit 0
}

foreach ($f in $aSubir) {
  Copy-Item -Path $f.Origen -Destination $f.Destino -Force
}

$rutas = @($aSubir | ForEach-Object { $_.Relativo })
$nombres = @($aSubir | ForEach-Object { $_.Final })

function Deshacer-Copias {
  foreach ($f in $aSubir) {
    if ($f.Accion -eq "Agrega") { Remove-Item -Path $f.Destino -Force -ErrorAction SilentlyContinue }
  }
}

git add -- $rutas
if ($LASTEXITCODE -ne 0) {
  Write-Host "ERROR en git add. No se subio nada." -ForegroundColor Red
  Deshacer-Copias
  exit 1
}

if ($aSubir.Count -eq 1) {
  $mensaje = "{0} foto de producto: {1}" -f $aSubir[0].Accion, $aSubir[0].Final
} else {
  $mensaje = "Agrega o reemplaza {0} fotos de productos: {1}" -f $aSubir.Count, ($nombres -join ", ")
}

git commit -m $mensaje -- $rutas
if ($LASTEXITCODE -ne 0) {
  Write-Host "ERROR en git commit (si no hay cambios, las fotos ya eran identicas). No se subio nada." -ForegroundColor Red
  git reset -q -- $rutas
  Deshacer-Copias
  exit 1
}

# Mover las originales a "subidas" una vez commiteadas
$sello = Get-Date -Format "yyyyMMdd-HHmmss"
foreach ($f in $aSubir) {
  $destinoSubida = Join-Path $subidas ("{0}-{1}" -f $sello, (Split-Path -Leaf $f.Origen))
  Move-Item -Path $f.Origen -Destination $destinoSubida -Force
}

git push
if ($LASTEXITCODE -ne 0) {
  Write-Host "ERROR en git push. Las fotos quedaron commiteadas pero no subidas." -ForegroundColor Red
  Write-Host "Cuando tengas conexion, corre: git push" -ForegroundColor Yellow
  exit 1
}

Write-Host ""
Write-Host ("Listo. Fotos publicadas: {0}" -f $aSubir.Count) -ForegroundColor Green
foreach ($n in $nombres) { Write-Host ("  - {0}" -f $n) }
Write-Host ""
Write-Host "En la planilla escribi exactamente estos nombres:"
Write-Host "  - Foto principal: columna imagen"
Write-Host "  - Fotos extra: columna imagenes_extra, separadas por punto y coma"
Write-Host "Espera 2 o 3 minutos a que Vercel termine de desplegar antes de completar la fila."
if ($errores -gt 0) {
  Write-Host ("Atencion: {0} foto(s) se omitieron. Revisa los mensajes de arriba." -f $errores) -ForegroundColor Yellow
}
