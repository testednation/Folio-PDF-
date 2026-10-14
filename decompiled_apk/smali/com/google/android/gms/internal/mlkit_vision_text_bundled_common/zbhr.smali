.class public final Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbhr;
.super Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbuf;
.source "com.google.mlkit:text-recognition-bundled-common@@17.0.0"

# interfaces
.implements Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbvn;


# static fields
.field private static final zbb:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbhr;


# instance fields
.field private zbd:I

.field private zbe:I

.field private zbf:Ljava/lang/Object;

.field private zbg:Z

.field private zbh:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbun;

.field private zbi:J

.field private zbj:Z

.field private zbk:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbuk;

.field private zbl:F

.field private zbm:F

.field private zbn:F

.field private zbo:F

.field private zbp:B


# direct methods
.method static constructor <clinit>()V
    .locals 2

    .line 1
    new-instance v0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbhr;

    invoke-direct {v0}, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbhr;-><init>()V

    sput-object v0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbhr;->zbb:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbhr;

    .line 2
    const-class v1, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbhr;

    invoke-static {v1, v0}, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbuf;->zbD(Ljava/lang/Class;Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbuf;)V

    return-void
.end method

.method private constructor <init>()V
    .locals 1

    .line 1
    invoke-direct {p0}, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbuf;-><init>()V

    const/4 v0, 0x0

    iput v0, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbhr;->zbe:I

    const/4 v0, 0x2

    iput-byte v0, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbhr;->zbp:B

    .line 2
    invoke-static {}, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbhr;->zby()Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbun;

    move-result-object v0

    iput-object v0, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbhr;->zbh:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbun;

    const/4 v0, 0x1

    iput-boolean v0, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbhr;->zbj:Z

    .line 3
    invoke-static {}, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbhr;->zbv()Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbuk;

    move-result-object v0

    iput-object v0, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbhr;->zbk:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbuk;

    const v0, 0x3e19999a    # 0.15f

    iput v0, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbhr;->zbl:F

    return-void
.end method

.method static synthetic zba()Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbhr;
    .locals 1

    sget-object v0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbhr;->zbb:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbhr;

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

    goto :goto_0

    .line 1
    :pswitch_1
    sget-object p1, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbhr;->zbb:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbhr;

    return-object p1

    :pswitch_2
    new-instance p1, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbhq;

    .line 3
    invoke-direct {p1, p3}, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbhq;-><init>(Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbhp;)V

    return-object p1

    :pswitch_3
    new-instance p1, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbhr;

    .line 4
    invoke-direct {p1}, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbhr;-><init>()V

    return-object p1

    .line 2
    :pswitch_4
    const/16 p1, 0xe

    new-array p1, p1, [Ljava/lang/Object;

    const-string p2, "zbf"

    aput-object p2, p1, v1

    const-string p2, "zbe"

    aput-object p2, p1, v0

    const/4 p2, 0x2

    const-string p3, "zbd"

    aput-object p3, p1, p2

    const/4 p2, 0x3

    const-class p3, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbim;

    aput-object p3, p1, p2

    const/4 p2, 0x4

    const-string p3, "zbg"

    aput-object p3, p1, p2

    const/4 p2, 0x5

    const-string p3, "zbh"

    aput-object p3, p1, p2

    const/4 p2, 0x6

    const-class p3, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbhi;

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

    const-string p3, "zbi"

    aput-object p3, p1, p2

    const/16 p2, 0xd

    const-string p3, "zbj"

    aput-object p3, p1, p2

    sget-object p2, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbhr;->zbb:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbhr;

    const-string p3, "\u0001\n\u0001\u0001\u0002\r\n\u0000\u0002\u0001\u0002\u043c\u0000\u0003\u1007\u0000\u0004\u001b\u0005\u0013\u0006\u1001\u0003\u0007\u1001\u0004\u0008\u1001\u0005\u000b\u1001\u0006\u000c\u1002\u0001\r\u1007\u0002"

    invoke-static {p2, p3, p1}, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbhr;->zbA(Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbvm;Ljava/lang/String;[Ljava/lang/Object;)Ljava/lang/Object;

    move-result-object p1

    return-object p1

    :pswitch_5
    iget-byte p1, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbhr;->zbp:B

    .line 1
    invoke-static {p1}, Ljava/lang/Byte;->valueOf(B)Ljava/lang/Byte;

    move-result-object p1

    return-object p1

    .line 2
    :cond_0
    :goto_0
    iput-byte v0, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbhr;->zbp:B

    return-object p3

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
