.class public final synthetic Lorg/folio/pdf/MlKitOcr$$ExternalSyntheticLambda0;
.super Ljava/lang/Object;
.source "D8$$SyntheticClass"

# interfaces
.implements Lcom/google/android/gms/tasks/OnSuccessListener;


# instance fields
.field public final synthetic f$0:Lcom/getcapacitor/PluginCall;


# direct methods
.method public synthetic constructor <init>(Lcom/getcapacitor/PluginCall;)V
    .locals 0

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    iput-object p1, p0, Lorg/folio/pdf/MlKitOcr$$ExternalSyntheticLambda0;->f$0:Lcom/getcapacitor/PluginCall;

    return-void
.end method


# virtual methods
.method public final onSuccess(Ljava/lang/Object;)V
    .locals 1

    iget-object v0, p0, Lorg/folio/pdf/MlKitOcr$$ExternalSyntheticLambda0;->f$0:Lcom/getcapacitor/PluginCall;

    check-cast p1, Lcom/google/mlkit/vision/text/Text;

    invoke-static {v0, p1}, Lorg/folio/pdf/MlKitOcr;->lambda$recognize$0(Lcom/getcapacitor/PluginCall;Lcom/google/mlkit/vision/text/Text;)V

    return-void
.end method
