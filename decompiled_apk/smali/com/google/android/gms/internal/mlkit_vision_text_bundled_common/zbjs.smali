.class public final Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbjs;
.super Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbuf;
.source "com.google.mlkit:text-recognition-bundled-common@@17.0.0"

# interfaces
.implements Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbvn;


# static fields
.field private static final zbb:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbjs;


# instance fields
.field private zbd:I

.field private zbe:J

.field private zbf:F

.field private zbg:F

.field private zbh:F

.field private zbi:F

.field private zbj:I

.field private zbk:F

.field private zbl:F

.field private zbm:I

.field private zbn:F

.field private zbo:F

.field private zbp:F

.field private zbq:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbaiq;

.field private zbr:F

.field private zbs:F

.field private zbt:F

.field private zbu:F

.field private zbv:F

.field private zbw:I

.field private zbx:I

.field private zby:F


# direct methods
.method static constructor <clinit>()V
    .locals 2

    .line 1
    new-instance v0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbjs;

    invoke-direct {v0}, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbjs;-><init>()V

    sput-object v0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbjs;->zbb:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbjs;

    const-class v1, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbjs;

    invoke-static {v1, v0}, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbuf;->zbD(Ljava/lang/Class;Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbuf;)V

    return-void
.end method

.method private constructor <init>()V
    .locals 2

    .line 1
    invoke-direct {p0}, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbuf;-><init>()V

    const-wide/32 v0, 0x3b9aca00

    iput-wide v0, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbjs;->zbe:J

    const v0, 0x3e4ccccd    # 0.2f

    iput v0, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbjs;->zbf:F

    const v0, 0x3f19999a    # 0.6f

    iput v0, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbjs;->zbg:F

    iput v0, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbjs;->zbh:F

    const/high16 v0, 0x3f000000    # 0.5f

    iput v0, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbjs;->zbi:F

    const/4 v1, 0x3

    iput v1, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbjs;->zbj:I

    const/high16 v1, -0x41000000    # -0.5f

    iput v1, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbjs;->zbk:F

    iput v1, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbjs;->zbl:F

    const v1, 0xf4240

    iput v1, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbjs;->zbm:I

    const/high16 v1, 0x41200000    # 10.0f

    iput v1, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbjs;->zbn:F

    const v1, 0x3f4ccccd    # 0.8f

    iput v1, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbjs;->zbo:F

    const/high16 v1, 0x3fc00000    # 1.5f

    iput v1, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbjs;->zbp:F

    const v1, 0x3e19999a    # 0.15f

    iput v1, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbjs;->zbr:F

    iput v0, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbjs;->zbs:F

    const v1, 0x3e99999a    # 0.3f

    iput v1, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbjs;->zbt:F

    const/high16 v1, 0x40400000    # 3.0f

    iput v1, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbjs;->zbu:F

    iput v1, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbjs;->zbv:F

    const/4 v1, 0x5

    iput v1, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbjs;->zbw:I

    iput v1, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbjs;->zbx:I

    iput v0, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbjs;->zby:F

    return-void
.end method

.method static synthetic zba()Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbjs;
    .locals 1

    sget-object v0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbjs;->zbb:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbjs;

    return-object v0
.end method


# virtual methods
.method protected final zbb(ILjava/lang/Object;Ljava/lang/Object;)Ljava/lang/Object;
    .locals 1

    .line 2
    add-int/lit8 p1, p1, -0x1

    const/4 p2, 0x0

    const/4 p3, 0x1

    packed-switch p1, :pswitch_data_0

    :pswitch_0
    return-object p2

    .line 1
    :pswitch_1
    sget-object p1, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbjs;->zbb:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbjs;

    return-object p1

    :pswitch_2
    new-instance p1, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbjr;

    .line 3
    invoke-direct {p1, p2}, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbjr;-><init>(Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbjq;)V

    return-object p1

    :pswitch_3
    new-instance p1, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbjs;

    invoke-direct {p1}, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbjs;-><init>()V

    return-object p1

    .line 2
    :pswitch_4
    const/16 p1, 0x16

    new-array p1, p1, [Ljava/lang/Object;

    const/4 p2, 0x0

    const-string v0, "zbd"

    aput-object v0, p1, p2

    const-string p2, "zbe"

    aput-object p2, p1, p3

    const/4 p2, 0x2

    const-string p3, "zbf"

    aput-object p3, p1, p2

    const/4 p2, 0x3

    const-string p3, "zbg"

    aput-object p3, p1, p2

    const/4 p2, 0x4

    const-string p3, "zbh"

    aput-object p3, p1, p2

    const/4 p2, 0x5

    const-string p3, "zbi"

    aput-object p3, p1, p2

    const/4 p2, 0x6

    const-string p3, "zbj"

    aput-object p3, p1, p2

    const/4 p2, 0x7

    const-string p3, "zbk"

    aput-object p3, p1, p2

    const/16 p2, 0x8

    const-string p3, "zbl"

    aput-object p3, p1, p2

    const/16 p2, 0x9

    const-string p3, "zbm"

    aput-object p3, p1, p2

    const/16 p2, 0xa

    const-string p3, "zbn"

    aput-object p3, p1, p2

    const/16 p2, 0xb

    const-string p3, "zbo"

    aput-object p3, p1, p2

    const/16 p2, 0xc

    const-string p3, "zbq"

    aput-object p3, p1, p2

    const/16 p2, 0xd

    const-string p3, "zbp"

    aput-object p3, p1, p2

    const/16 p2, 0xe

    const-string p3, "zbr"

    aput-object p3, p1, p2

    const/16 p2, 0xf

    const-string p3, "zbs"

    aput-object p3, p1, p2

    const/16 p2, 0x10

    const-string p3, "zbt"

    aput-object p3, p1, p2

    const/16 p2, 0x11

    const-string p3, "zbu"

    aput-object p3, p1, p2

    const/16 p2, 0x12

    const-string p3, "zbv"

    aput-object p3, p1, p2

    const/16 p2, 0x13

    const-string p3, "zbw"

    aput-object p3, p1, p2

    const/16 p2, 0x14

    const-string p3, "zbx"

    aput-object p3, p1, p2

    const/16 p2, 0x15

    const-string p3, "zby"

    aput-object p3, p1, p2

    sget-object p2, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbjs;->zbb:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbjs;

    const-string p3, "\u0001\u0015\u0000\u0001\u0001\u0015\u0015\u0000\u0000\u0000\u0001\u1002\u0000\u0002\u1001\u0001\u0003\u1001\u0002\u0004\u1001\u0003\u0005\u1001\u0004\u0006\u1004\u0005\u0007\u1001\u0006\u0008\u1001\u0007\t\u1004\u0008\n\u1001\t\u000b\u1001\n\u000c\u1009\u000c\r\u1001\u000b\u000e\u1001\r\u000f\u1001\u000e\u0010\u1001\u000f\u0011\u1001\u0010\u0012\u1001\u0011\u0013\u1004\u0012\u0014\u1004\u0013\u0015\u1001\u0014"

    invoke-static {p2, p3, p1}, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbjs;->zbA(Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbvm;Ljava/lang/String;[Ljava/lang/Object;)Ljava/lang/Object;

    move-result-object p1

    return-object p1

    .line 1
    :pswitch_5
    invoke-static {p3}, Ljava/lang/Byte;->valueOf(B)Ljava/lang/Byte;

    move-result-object p1

    return-object p1

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
