#include <iostream>
#include <iomanip>
#include <fstream>
#include <filesystem>

#include <string>
#include <vector>
#include <unordered_set>
#include <unordered_map>
#include <algorithm>

#define ll long long
#define pis pair<int, string>
#define ff first
#define ss second

using namespace std;
using std::filesystem::recursive_directory_iterator;

// list of directory ("AppUsageEventEntity" included)
vector<string> file_names;

// ifstream & ofstream
ifstream fin;
ofstream fout;

unordered_map<int, int> mp_user;

struct Usage_Info{
    ll timestamp;
    bool type;

    bool operator<(const Usage_Info &ui){
        return timestamp < ui.timestamp;
    }
};

int user_list[82] = {
    0,
    701, 702, 703, 704, 705,
    706, 707, 708, 709, 710,
    711, 712, 713, 714, 715,
    716, 717, 718, 719, 721,
    722, 723, 724, 725, 726,
    727, 728, 729,
    1501, 1502, 1503, 1504, 1505,
    1506, 1507, 1508, 1509, 1510,
    1511, 1514, 1515, 1516, 1517,
    1518, 1519, 1520, 1521, 1522,
    1523, 1525, 1526, 1527, 1541,
    3001, 3002, 3003, 3004, 3005,
    3007, 3008, 3009, 3010, 3011,
    3012, 3013, 3014, 3015, 3016,
    3017, 3018, 3019, 3021, 3022,
    3023, 3024, 3025, 3027, 3028,
    3029, 3030, 3041
};

void init(){
    for(int i = 1; i <= 81; i++) mp_user[user_list[i]] = i;
}

int get_dir(){
    for(const auto &file : recursive_directory_iterator("C:/Users/jx2ha/Desktop/2-1/CS481/Week 5 (0327-0402)/Dataset")){
        string str_path = file.path().string();
        replace(str_path.begin(), str_path.end(), '\\', '/'); // replace '\' to '/'

        // Find AppUsageEventEntity files
        if(str_path.find("DeviceEventEntity") == 141){
            file_names.push_back(str_path);

            //cout << str_path.substr(60) << endl;
        }
    }

    return EXIT_SUCCESS;
}

// input file open
void fin_open(string path){
    fin.open(path);
    if(fin.fail()){
        cerr << "Input Error!" << endl;
        exit(0);
    }
}

// input file close
void fin_close(){
    fin.close();
}

// output file open
void fout_open(string path){
    fout.open(path);
    if(fout.fail()){
        cerr << "Output Error!" << endl;
        exit(0);
    }

    fout << fixed;
    fout.precision(3);
}

// output file close
void fout_close(){
    fout.close();
}

int now_user, now_day;
int sum[82][8], mx[82][8], day[82][8], hour[82][8][24];
// 81 user, 7 days

vector<Usage_Info> vc_info;

void Input(){
    vc_info.clear();

    // Take one line at a time until reach the end of the file...
    string str_line;
    while(getline(fin, str_line)){
        // first & second ',' position
        int pos = str_line.find(",");

        // Extract app name from one row
        string str_stp = str_line.substr(0, pos);
        string str_typ = str_line.substr(pos+1);

        //cout << str_ttf << endl;

        if(str_typ != "SCREEN_ON" && str_typ != "SCREEN_OFF") continue;

        vc_info.push_back({stoll(str_stp), str_typ == "SCREEN_ON"});
    }
}

void Processing(){
    int &sum_ = sum[now_user][now_day];
    int &mx_ = mx[now_user][now_day];
    int &day_ = day[now_user][now_day];
    auto &hour_ = hour[now_user][now_day];

    sort(vc_info.begin(), vc_info.end());
/*
    if(!vc_info.front().type){
        sum_ += vc_info.front().timestamp%(24*60*60*1000);
        mx_ = vc_info.front().timestamp%(24*60*60*1000);
        day_++;
    }
*/
    ll stp;
    bool flag = false;
    for(Usage_Info ui : vc_info){
        if(!flag && ui.type){
            flag = true;
            stp = ui.timestamp;
        }
        else if(flag && !ui.type){
            flag = false;
            sum_ += ui.timestamp-stp;
            mx_ = max(mx_, (int)(ui.timestamp-stp));
            day_++;
            hour_[stp%(24*60*60*1000)/(60*60*1000)]++;
        }
    }
/*
    if(flag){
        sum_ += 24*60*60*1000-stp%(24*60*60*1000);
        mx_ = max(mx_, (int)(24*60*60*1000-stp%(24*60*60*1000)));
        day_++;
    }
*/

/*=============================================================================*/

    //printf("%d %d\n", now_user, now_day);
}

void Output(int i){
    fout << "[" << endl;
    for(int j = 1; j <= 7; j++){
        fout << "\t{" << endl;
        fout << "\t\t\"date\": " << j << "," << endl;
        fout << "\t\t\"maxTime\": " << mx[i][j]/(60*1000) << "," << endl;
        fout << "\t\t\"totalUnlockCount\": " << day[i][j] << "," << endl;

        fout << "\t\t\"keys\": [" << endl;
        for(int k = 0; k <= 23; k++){
            fout << "\t\t\t{\"hour\": \"" << k << "\", \"unlockCount\": " << hour[i][j][k] << "}";
            if(k != 23) fout << ",";
            fout << endl;
        }
        fout << "\t\t]" << endl;
        fout << "\t}";
        if(j != 7) fout << ",";
        fout << endl;
    }
    fout << "]" << endl;
}

int main(){
//  freopen("input.txt", "r", stdin);
//  freopen("output.txt", "w", stdout);

    init();
    get_dir();

    // Set UTF-8 Code Page Identifiers
    system("chcp 65001");

    for(string str : file_names){
        //cout << "Processing... " << str << endl;

        //st_app.clear();

        int next_user = mp_user[stoi(str.substr(136, 4))];
        if(now_user != next_user){
            now_user = next_user;
            now_day = 1;
        }
        else now_day++;

        if(!now_user) cout << str << endl;

        fin_open(str);
        Input();
        fin_close();

        Processing();
    }

    for(int i = 1; i <= 81; i++){
        string str = "C:/Users/jx2ha/Desktop/2-1/CS481/Week 11 (0508-0514)/results/json2/P";
        if(user_list[i] < 1000) str += "0";
        str += to_string(user_list[i]);
        str += ".json";

        //cout << str << endl;
        for(int j = 1; j <= 7; j++) cout << sum[i][j] << endl;

        fout_open(str);
        Output(i);
        fout_close();
    }

    return 0;
}