files=("../raw/R1_600k.mp4" "../raw/R5_600k.mp4" "../raw/R10.mp4" "../raw/A004C014_160226_R4RF.mov")
for i in "${files[@]}"
do
    start_ts=$(date +"%s.%S")
    md5=$(md5 "$i" | awk '{print $4}')
    end_ts=$(date +"%s.%S")
    duration=$(bc <<< "$end_ts-$start_ts")

    file_size=$(stat "$i" | awk '{print $8}')
    norm_size=$(($file_size/1000))
    norm_size_float=$(bc <<< "scale=2; $file_size/1000")

    j=1
    while [ $norm_size -gt 999 ]
    do
        j=$((j+1))
        file_size=$norm_size
        norm_size=$(($file_size/1000))
        norm_size_float=$(bc <<< "scale=2; $norm_size_float/1000")
    done

    sizeUnitChar="B"

    case $j in
    1)
        sizeUnitChar="KB"
        ;;
    2)
        sizeUnitChar="MB"
        ;;
    3)
        sizeUnitChar="GB"
        ;;
    4)
        sizeUnitChar="TB"
        ;;
    5)
        sizeUnitChar="PB"
        ;;
    *)
        sizeUnitChar="*****"
    esac

    echo "$norm_size_float $sizeUnitChar - $duration s: $md5"

done