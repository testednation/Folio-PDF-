.class public Lorg/folio/pdf/MlKitOcr;
.super Lcom/getcapacitor/Plugin;
.source "MlKitOcr.java"


# annotations
.annotation runtime Lcom/getcapacitor/annotation/CapacitorPlugin;
    name = "MlKitOcr"
.end annotation


# instance fields
.field rec:Lcom/google/mlkit/vision/text/TextRecognizer;


# direct methods
.method public constructor <init>()V
    .locals 0

    .line 8
    invoke-direct {p0}, Lcom/getcapacitor/Plugin;-><init>()V

    return-void
.end method

.method static synthetic lambda$recognize$0(Lcom/getcapacitor/PluginCall;Lcom/google/mlkit/vision/text/Text;)V
    .locals 14
    .param p0, "call"    # Lcom/getcapacitor/PluginCall;
    .param p1, "t"    # Lcom/google/mlkit/vision/text/Text;

    .line 12
    new-instance v0, Lcom/getcapacitor/JSArray;

    invoke-direct {v0}, Lcom/getcapacitor/JSArray;-><init>()V

    .line 13
    .local v0, "words":Lcom/getcapacitor/JSArray;
    invoke-virtual {p1}, Lcom/google/mlkit/vision/text/Text;->getTextBlocks()Ljava/util/List;

    move-result-object v1

    invoke-interface {v1}, Ljava/util/List;->iterator()Ljava/util/Iterator;

    move-result-object v1

    :goto_0
    invoke-interface {v1}, Ljava/util/Iterator;->hasNext()Z

    move-result v2

    const-string v3, "text"

    if-eqz v2, :cond_4

    invoke-interface {v1}, Ljava/util/Iterator;->next()Ljava/lang/Object;

    move-result-object v2

    check-cast v2, Lcom/google/mlkit/vision/text/Text$TextBlock;

    .local v2, "bl":Lcom/google/mlkit/vision/text/Text$TextBlock;
    invoke-virtual {v2}, Lcom/google/mlkit/vision/text/Text$TextBlock;->getLines()Ljava/util/List;

    move-result-object v4

    invoke-interface {v4}, Ljava/util/List;->iterator()Ljava/util/Iterator;

    move-result-object v4

    :goto_1
    invoke-interface {v4}, Ljava/util/Iterator;->hasNext()Z

    move-result v5

    if-eqz v5, :cond_3

    invoke-interface {v4}, Ljava/util/Iterator;->next()Ljava/lang/Object;

    move-result-object v5

    check-cast v5, Lcom/google/mlkit/vision/text/Text$Line;

    .local v5, "ln":Lcom/google/mlkit/vision/text/Text$Line;
    invoke-virtual {v5}, Lcom/google/mlkit/vision/text/Text$Line;->getElements()Ljava/util/List;

    move-result-object v6

    invoke-interface {v6}, Ljava/util/List;->iterator()Ljava/util/Iterator;

    move-result-object v6

    :goto_2
    invoke-interface {v6}, Ljava/util/Iterator;->hasNext()Z

    move-result v7

    if-eqz v7, :cond_2

    invoke-interface {v6}, Ljava/util/Iterator;->next()Ljava/lang/Object;

    move-result-object v7

    check-cast v7, Lcom/google/mlkit/vision/text/Text$Element;

    .local v7, "el":Lcom/google/mlkit/vision/text/Text$Element;
    invoke-virtual {v7}, Lcom/google/mlkit/vision/text/Text$Element;->getBoundingBox()Landroid/graphics/Rect;

    move-result-object v8

    .local v8, "r":Landroid/graphics/Rect;
    if-nez v8, :cond_0

    goto :goto_2

    :cond_0
    new-instance v9, Lcom/getcapacitor/JSObject;

    invoke-direct {v9}, Lcom/getcapacitor/JSObject;-><init>()V

    .local v9, "o":Lcom/getcapacitor/JSObject;
    invoke-virtual {v7}, Lcom/google/mlkit/vision/text/Text$Element;->getText()Ljava/lang/String;

    move-result-object v10

    invoke-virtual {v9, v3, v10}, Lcom/getcapacitor/JSObject;->put(Ljava/lang/String;Ljava/lang/String;)Lcom/getcapacitor/JSObject;

    const-string v10, "x0"

    iget v11, v8, Landroid/graphics/Rect;->left:I

    invoke-virtual {v9, v10, v11}, Lcom/getcapacitor/JSObject;->put(Ljava/lang/String;I)Lcom/getcapacitor/JSObject;

    const-string v10, "y0"

    iget v11, v8, Landroid/graphics/Rect;->top:I

    invoke-virtual {v9, v10, v11}, Lcom/getcapacitor/JSObject;->put(Ljava/lang/String;I)Lcom/getcapacitor/JSObject;

    const-string v10, "x1"

    iget v11, v8, Landroid/graphics/Rect;->right:I

    invoke-virtual {v9, v10, v11}, Lcom/getcapacitor/JSObject;->put(Ljava/lang/String;I)Lcom/getcapacitor/JSObject;

    const-string v10, "y1"

    iget v11, v8, Landroid/graphics/Rect;->bottom:I

    invoke-virtual {v9, v10, v11}, Lcom/getcapacitor/JSObject;->put(Ljava/lang/String;I)Lcom/getcapacitor/JSObject;

    invoke-virtual {v7}, Lcom/google/mlkit/vision/text/Text$Element;->getConfidence()F

    move-result v10

    invoke-static {v10}, Ljava/lang/Float;->valueOf(F)Ljava/lang/Float;

    move-result-object v10

    .local v10, "cf":Ljava/lang/Float;
    if-nez v10, :cond_1

    const-wide v11, 0x4056800000000000L    # 90.0

    goto :goto_3

    :cond_1
    invoke-virtual {v10}, Ljava/lang/Float;->floatValue()F

    move-result v11

    const/high16 v12, 0x42c80000    # 100.0f

    mul-float v11, v11, v12

    float-to-double v11, v11

    :goto_3
    const-string v13, "confidence"

    invoke-virtual {v9, v13, v11, v12}, Lcom/getcapacitor/JSObject;->put(Ljava/lang/String;D)Lcom/getcapacitor/JSObject;

    invoke-virtual {v0, v9}, Lcom/getcapacitor/JSArray;->put(Ljava/lang/Object;)Lorg/json/JSONArray;

    goto :goto_2

    .end local v5    # "ln":Lcom/google/mlkit/vision/text/Text$Line;
    .end local v7    # "el":Lcom/google/mlkit/vision/text/Text$Element;
    .end local v8    # "r":Landroid/graphics/Rect;
    .end local v9    # "o":Lcom/getcapacitor/JSObject;
    .end local v10    # "cf":Ljava/lang/Float;
    :cond_2
    goto :goto_1

    .end local v2    # "bl":Lcom/google/mlkit/vision/text/Text$TextBlock;
    :cond_3
    goto/16 :goto_0

    .line 14
    :cond_4
    new-instance v1, Lcom/getcapacitor/JSObject;

    invoke-direct {v1}, Lcom/getcapacitor/JSObject;-><init>()V

    .local v1, "res":Lcom/getcapacitor/JSObject;
    const-string v2, "words"

    invoke-virtual {v1, v2, v0}, Lcom/getcapacitor/JSObject;->put(Ljava/lang/String;Ljava/lang/Object;)Lcom/getcapacitor/JSObject;

    invoke-virtual {p1}, Lcom/google/mlkit/vision/text/Text;->getText()Ljava/lang/String;

    move-result-object v2

    invoke-virtual {v1, v3, v2}, Lcom/getcapacitor/JSObject;->put(Ljava/lang/String;Ljava/lang/String;)Lcom/getcapacitor/JSObject;

    invoke-virtual {p0, v1}, Lcom/getcapacitor/PluginCall;->resolve(Lcom/getcapacitor/JSObject;)V

    return-void
.end method

.method static synthetic lambda$recognize$1(Lcom/getcapacitor/PluginCall;Ljava/lang/Exception;)V
    .locals 1
    .param p0, "call"    # Lcom/getcapacitor/PluginCall;
    .param p1, "e"    # Ljava/lang/Exception;

    .line 14
    invoke-virtual {p1}, Ljava/lang/Exception;->getMessage()Ljava/lang/String;

    move-result-object v0

    invoke-virtual {p0, v0}, Lcom/getcapacitor/PluginCall;->reject(Ljava/lang/String;)V

    return-void
.end method


# virtual methods
.method public recognize(Lcom/getcapacitor/PluginCall;)V
    .locals 6
    .param p1, "call"    # Lcom/getcapacitor/PluginCall;
    .annotation runtime Lcom/getcapacitor/PluginMethod;
    .end annotation

    .line 10
    :try_start_0
    const-string v0, "image"

    const-string v1, ""

    invoke-virtual {p1, v0, v1}, Lcom/getcapacitor/PluginCall;->getString(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;

    move-result-object v0

    .local v0, "s":Ljava/lang/String;
    const/16 v1, 0x2c

    invoke-virtual {v0, v1}, Ljava/lang/String;->indexOf(I)I

    move-result v1

    .local v1, "c":I
    if-ltz v1, :cond_0

    add-int/lit8 v2, v1, 0x1

    invoke-virtual {v0, v2}, Ljava/lang/String;->substring(I)Ljava/lang/String;

    move-result-object v2

    move-object v0, v2

    :cond_0
    const/4 v2, 0x0

    invoke-static {v0, v2}, Landroid/util/Base64;->decode(Ljava/lang/String;I)[B

    move-result-object v3

    .line 11
    .local v3, "b":[B
    array-length v4, v3

    invoke-static {v3, v2, v4}, Landroid/graphics/BitmapFactory;->decodeByteArray([BII)Landroid/graphics/Bitmap;

    move-result-object v4

    .local v4, "bm":Landroid/graphics/Bitmap;
    if-nez v4, :cond_1

    const-string v2, "bad image"

    invoke-virtual {p1, v2}, Lcom/getcapacitor/PluginCall;->reject(Ljava/lang/String;)V

    return-void

    :cond_1
    iget-object v5, p0, Lorg/folio/pdf/MlKitOcr;->rec:Lcom/google/mlkit/vision/text/TextRecognizer;

    if-nez v5, :cond_2

    sget-object v5, Lcom/google/mlkit/vision/text/latin/TextRecognizerOptions;->DEFAULT_OPTIONS:Lcom/google/mlkit/vision/text/latin/TextRecognizerOptions;

    invoke-static {v5}, Lcom/google/mlkit/vision/text/TextRecognition;->getClient(Lcom/google/mlkit/vision/text/TextRecognizerOptionsInterface;)Lcom/google/mlkit/vision/text/TextRecognizer;

    move-result-object v5

    iput-object v5, p0, Lorg/folio/pdf/MlKitOcr;->rec:Lcom/google/mlkit/vision/text/TextRecognizer;

    .line 12
    :cond_2
    iget-object v5, p0, Lorg/folio/pdf/MlKitOcr;->rec:Lcom/google/mlkit/vision/text/TextRecognizer;

    invoke-static {v4, v2}, Lcom/google/mlkit/vision/common/InputImage;->fromBitmap(Landroid/graphics/Bitmap;I)Lcom/google/mlkit/vision/common/InputImage;

    move-result-object v2

    invoke-interface {v5, v2}, Lcom/google/mlkit/vision/text/TextRecognizer;->process(Lcom/google/mlkit/vision/common/InputImage;)Lcom/google/android/gms/tasks/Task;

    move-result-object v2

    new-instance v5, Lorg/folio/pdf/MlKitOcr$$ExternalSyntheticLambda0;

    invoke-direct {v5, p1}, Lorg/folio/pdf/MlKitOcr$$ExternalSyntheticLambda0;-><init>(Lcom/getcapacitor/PluginCall;)V

    invoke-virtual {v2, v5}, Lcom/google/android/gms/tasks/Task;->addOnSuccessListener(Lcom/google/android/gms/tasks/OnSuccessListener;)Lcom/google/android/gms/tasks/Task;

    move-result-object v2

    new-instance v5, Lorg/folio/pdf/MlKitOcr$$ExternalSyntheticLambda1;

    invoke-direct {v5, p1}, Lorg/folio/pdf/MlKitOcr$$ExternalSyntheticLambda1;-><init>(Lcom/getcapacitor/PluginCall;)V

    .line 14
    invoke-virtual {v2, v5}, Lcom/google/android/gms/tasks/Task;->addOnFailureListener(Lcom/google/android/gms/tasks/OnFailureListener;)Lcom/google/android/gms/tasks/Task;
    :try_end_0
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_0} :catch_0

    goto :goto_0

    .end local v0    # "s":Ljava/lang/String;
    .end local v1    # "c":I
    .end local v3    # "b":[B
    .end local v4    # "bm":Landroid/graphics/Bitmap;
    :catch_0
    move-exception v0

    .local v0, "e":Ljava/lang/Exception;
    invoke-virtual {v0}, Ljava/lang/Exception;->getMessage()Ljava/lang/String;

    move-result-object v1

    invoke-virtual {p1, v1}, Lcom/getcapacitor/PluginCall;->reject(Ljava/lang/String;)V

    .end local v0    # "e":Ljava/lang/Exception;
    :goto_0
    return-void
.end method
