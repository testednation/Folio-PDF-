.class public Lorg/folio/pdf/MainActivity;
.super Lcom/getcapacitor/BridgeActivity;
.source "MainActivity.java"


# direct methods
.method public constructor <init>()V
    .locals 0

    .line 4
    invoke-direct {p0}, Lcom/getcapacitor/BridgeActivity;-><init>()V

    return-void
.end method


# virtual methods
.method public onCreate(Landroid/os/Bundle;)V
    .locals 1
    .param p1, "b"    # Landroid/os/Bundle;

    .line 5
    const-class v0, Lorg/folio/pdf/MlKitOcr;

    invoke-virtual {p0, v0}, Lorg/folio/pdf/MainActivity;->registerPlugin(Ljava/lang/Class;)V

    invoke-super {p0, p1}, Lcom/getcapacitor/BridgeActivity;->onCreate(Landroid/os/Bundle;)V

    return-void
.end method
