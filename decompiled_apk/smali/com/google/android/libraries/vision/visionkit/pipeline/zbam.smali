.class public final Lcom/google/android/libraries/vision/visionkit/pipeline/zbam;
.super Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbuf;
.source "com.google.mlkit:text-recognition-bundled-common@@17.0.0"

# interfaces
.implements Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbvn;


# static fields
.field private static final zbb:Lcom/google/android/libraries/vision/visionkit/pipeline/zbam;


# instance fields
.field private zbd:I

.field private zbe:I

.field private zbf:Ljava/lang/Object;

.field private zbg:Z

.field private zbh:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbix;

.field private zbi:Z

.field private zbj:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbhf;

.field private zbk:F

.field private zbl:Z

.field private zbm:Z

.field private zbn:I

.field private zbo:Z

.field private zbp:F

.field private zbq:I

.field private zbr:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbbq;

.field private zbs:B


# direct methods
.method static constructor <clinit>()V
    .locals 2

    .line 1
    new-instance v0, Lcom/google/android/libraries/vision/visionkit/pipeline/zbam;

    invoke-direct {v0}, Lcom/google/android/libraries/vision/visionkit/pipeline/zbam;-><init>()V

    sput-object v0, Lcom/google/android/libraries/vision/visionkit/pipeline/zbam;->zbb:Lcom/google/android/libraries/vision/visionkit/pipeline/zbam;

    const-class v1, Lcom/google/android/libraries/vision/visionkit/pipeline/zbam;

    invoke-static {v1, v0}, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbuf;->zbD(Ljava/lang/Class;Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbuf;)V

    return-void
.end method

.method private constructor <init>()V
    .locals 1

    .line 1
    invoke-direct {p0}, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbuf;-><init>()V

    const/4 v0, 0x0

    iput v0, p0, Lcom/google/android/libraries/vision/visionkit/pipeline/zbam;->zbe:I

    const/4 v0, 0x2

    iput-byte v0, p0, Lcom/google/android/libraries/vision/visionkit/pipeline/zbam;->zbs:B

    const/4 v0, -0x1

    iput v0, p0, Lcom/google/android/libraries/vision/visionkit/pipeline/zbam;->zbn:I

    return-void
.end method

.method static synthetic zba()Lcom/google/android/libraries/vision/visionkit/pipeline/zbam;
    .locals 1

    sget-object v0, Lcom/google/android/libraries/vision/visionkit/pipeline/zbam;->zbb:Lcom/google/android/libraries/vision/visionkit/pipeline/zbam;

    return-object v0
.end method


# virtual methods
.method protected final zbb(ILjava/lang/Object;Ljava/lang/Object;)Ljava/lang/Object;
    .locals 2

    .line 2
    add-int/lit8 p1, p1, -0x1

    const/4 p3, 0x0

    const/4 v0, 0x1

    const/4 v1, 0x0

    packed-switch p1, :pswitch_data_0

    :pswitch_0
    if-nez p2, :cond_0

    const/4 v0, 0x0

    goto/16 :goto_0

    .line 1
    :pswitch_1
    sget-object p1, Lcom/google/android/libraries/vision/visionkit/pipeline/zbam;->zbb:Lcom/google/android/libraries/vision/visionkit/pipeline/zbam;

    return-object p1

    :pswitch_2
    new-instance p1, Lcom/google/android/libraries/vision/visionkit/pipeline/zbal;

    .line 3
    invoke-direct {p1, p3}, Lcom/google/android/libraries/vision/visionkit/pipeline/zbal;-><init>(Lcom/google/android/libraries/vision/visionkit/pipeline/zbak;)V

    return-object p1

    :pswitch_3
    new-instance p1, Lcom/google/android/libraries/vision/visionkit/pipeline/zbam;

    invoke-direct {p1}, Lcom/google/android/libraries/vision/visionkit/pipeline/zbam;-><init>()V

    return-object p1

    .line 2
    :pswitch_4
    const/16 p1, 0x11

    new-array p1, p1, [Ljava/lang/Object;

    const-string p2, "zbf"

    aput-object p2, p1, v1

    const-string p2, "zbe"

    aput-object p2, p1, v0

    const/4 p2, 0x2

    const-string p3, "zbd"

    aput-object p3, p1, p2

    const/4 p2, 0x3

    const-class p3, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbafq;

    aput-object p3, p1, p2

    const/4 p2, 0x4

    const-string p3, "zbh"

    aput-object p3, p1, p2

    const/4 p2, 0x5

    const-string p3, "zbj"

    aput-object p3, p1, p2

    const/4 p2, 0x6

    const-string p3, "zbm"

    aput-object p3, p1, p2

    const/4 p2, 0x7

    const-string p3, "zbn"

    aput-object p3, p1, p2

    const/16 p2, 0x8

    const-string p3, "zbo"

    aput-object p3, p1, p2

    const/16 p2, 0x9

    const-string p3, "zbg"

    aput-object p3, p1, p2

    const/16 p2, 0xa

    const-string p3, "zbp"

    aput-object p3, p1, p2

    const/16 p2, 0xb

    const-string p3, "zbq"

    aput-object p3, p1, p2

    const/16 p2, 0xc

    const-string p3, "zbi"

    aput-object p3, p1, p2

    const/16 p2, 0xd

    const-string p3, "zbr"

    aput-object p3, p1, p2

    const/16 p2, 0xe

    const-string p3, "zbk"

    aput-object p3, p1, p2

    const/16 p2, 0xf

    const-string p3, "zbl"

    aput-object p3, p1, p2

    const/16 p2, 0x10

    const-class p3, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbcz;

    aput-object p3, p1, p2

    sget-object p2, Lcom/google/android/libraries/vision/visionkit/pipeline/zbam;->zbb:Lcom/google/android/libraries/vision/visionkit/pipeline/zbam;

    const-string p3, "\u0004\u000e\u0001\u0001\u0001\u000e\u000e\u0000\u0000\u0001\u0001\u043c\u0000\u0002\u1009\u0001\u0003\u1009\u0003\u0004\u1007\u0006\u0005\u1004\u0007\u0006\u1007\u0008\u0007\u1007\u0000\u0008\u1001\t\t\u1004\n\n\u1007\u0002\u000b\u1009\u000b\u000c\u1001\u0004\r\u1007\u0005\u000e<\u0000"

    invoke-static {p2, p3, p1}, Lcom/google/android/libraries/vision/visionkit/pipeline/zbam;->zbA(Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbvm;Ljava/lang/String;[Ljava/lang/Object;)Ljava/lang/Object;

    move-result-object p1

    return-object p1

    :pswitch_5
    iget-byte p1, p0, Lcom/google/android/libraries/vision/visionkit/pipeline/zbam;->zbs:B

    .line 1
    invoke-static {p1}, Ljava/lang/Byte;->valueOf(B)Ljava/lang/Byte;

    move-result-object p1

    return-object p1

    .line 2
    :cond_0
    :goto_0
    iput-byte v0, p0, Lcom/google/android/libraries/vision/visionkit/pipeline/zbam;->zbs:B

    return-object p3

    nop

    :pswitch_data_0
    .packed-switch 0x0
        :pswitch_5
        :pswitch_0
        :pswitch_4
        :pswitch_3
        :pswitch_2
        :pswitch_1
    .end packed-switch
.end method
