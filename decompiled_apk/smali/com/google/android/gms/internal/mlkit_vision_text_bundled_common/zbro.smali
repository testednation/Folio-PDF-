.class public final Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbro;
.super Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbuf;
.source "com.google.mlkit:text-recognition-bundled-common@@17.0.0"

# interfaces
.implements Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbvn;


# static fields
.field private static final zbb:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbro;


# instance fields
.field private zbd:I

.field private zbe:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbtc;

.field private zbf:I

.field private zbg:I

.field private zbh:Ljava/lang/String;

.field private zbi:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbun;

.field private zbj:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbrq;

.field private zbk:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbun;

.field private zbl:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbqw;

.field private zbm:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbqt;

.field private zbn:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbun;

.field private zbo:B


# direct methods
.method static constructor <clinit>()V
    .locals 2

    .line 1
    new-instance v0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbro;

    invoke-direct {v0}, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbro;-><init>()V

    sput-object v0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbro;->zbb:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbro;

    .line 2
    const-class v1, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbro;

    invoke-static {v1, v0}, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbuf;->zbD(Ljava/lang/Class;Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbuf;)V

    return-void
.end method

.method private constructor <init>()V
    .locals 1

    .line 1
    invoke-direct {p0}, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbuf;-><init>()V

    const/4 v0, 0x2

    iput-byte v0, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbro;->zbo:B

    .line 2
    sget-object v0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbtc;->zbb:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbtc;

    iput-object v0, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbro;->zbe:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbtc;

    const-string v0, ""

    iput-object v0, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbro;->zbh:Ljava/lang/String;

    .line 3
    invoke-static {}, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbro;->zby()Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbun;

    move-result-object v0

    iput-object v0, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbro;->zbi:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbun;

    .line 4
    invoke-static {}, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbro;->zby()Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbun;

    move-result-object v0

    iput-object v0, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbro;->zbk:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbun;

    .line 5
    invoke-static {}, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbro;->zby()Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbun;

    move-result-object v0

    iput-object v0, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbro;->zbn:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbun;

    return-void
.end method

.method static synthetic zba()Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbro;
    .locals 1

    sget-object v0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbro;->zbb:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbro;

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
    sget-object p1, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbro;->zbb:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbro;

    return-object p1

    :pswitch_2
    new-instance p1, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbrn;

    .line 3
    invoke-direct {p1, p3}, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbrn;-><init>(Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbpu;)V

    return-object p1

    :pswitch_3
    new-instance p1, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbro;

    .line 4
    invoke-direct {p1}, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbro;-><init>()V

    return-object p1

    .line 2
    :pswitch_4
    const/16 p1, 0xe

    new-array p1, p1, [Ljava/lang/Object;

    const-string p2, "zbd"

    aput-object p2, p1, v1

    const-string p2, "zbe"

    aput-object p2, p1, v0

    const/4 p2, 0x2

    const-string p3, "zbh"

    aput-object p3, p1, p2

    const/4 p2, 0x3

    const-string p3, "zbi"

    aput-object p3, p1, p2

    const/4 p2, 0x4

    const-class p3, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbqq;

    aput-object p3, p1, p2

    const/4 p2, 0x5

    const-string p3, "zbj"

    aput-object p3, p1, p2

    const/4 p2, 0x6

    const-string p3, "zbk"

    aput-object p3, p1, p2

    const/4 p2, 0x7

    const-class p3, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbrm;

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

    const-class p3, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbrk;

    aput-object p3, p1, p2

    const/16 p2, 0xc

    const-string p3, "zbf"

    aput-object p3, p1, p2

    const/16 p2, 0xd

    const-string p3, "zbg"

    aput-object p3, p1, p2

    sget-object p2, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbro;->zbb:Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbro;

    const-string p3, "\u0001\n\u0000\u0001\u0001\n\n\u0000\u0003\u0004\u0001\u150a\u0000\u0002\u1008\u0003\u0003\u041b\u0004\u1009\u0004\u0005\u041b\u0006\u1009\u0005\u0007\u1009\u0006\u0008\u041b\t\u1004\u0001\n\u1004\u0002"

    invoke-static {p2, p3, p1}, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbro;->zbA(Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbvm;Ljava/lang/String;[Ljava/lang/Object;)Ljava/lang/Object;

    move-result-object p1

    return-object p1

    :pswitch_5
    iget-byte p1, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbro;->zbo:B

    .line 1
    invoke-static {p1}, Ljava/lang/Byte;->valueOf(B)Ljava/lang/Byte;

    move-result-object p1

    return-object p1

    .line 2
    :cond_0
    :goto_0
    iput-byte v0, p0, Lcom/google/android/gms/internal/mlkit_vision_text_bundled_common/zbro;->zbo:B

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
