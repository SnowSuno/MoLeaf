#include <iostream>
#include <iomanip>
#include <fstream>
#include <filesystem>

#include <string>
#include <vector>
#include <unordered_set>
#include <unordered_map>
#include <algorithm>

#define pis pair<int, string>
#define ff first
#define ss second

using namespace std;
using std::filesystem::recursive_directory_iterator;


vector<string> file_names;

int get_dir(){
    for (const auto & file : recursive_directory_iterator("C:/Users/jx2ha/Desktop/2-1/CS481/Week 5 (0327-0402)/Dataset")){
        string str_path = file.path().string();
        replace(str_path.begin(), str_path.end(), '\\', '/');

        cout << str_path << endl;

        if(str_path.find("AppUsageEventEntity") == 141) file_names.push_back(str_path);

    }

    return EXIT_SUCCESS;
}

// ifstream & ofstream
ifstream fin;
ofstream fout;

unordered_set<string> st_app;
unordered_set<string> st_total_app;
unordered_map<string, int> mp_total_app;
vector<pis> vc_total;

void fin_open(string path){
    fin.open(path);
    if(fin.fail()){
		cerr << "Input Error!" << endl;
        exit(0);
	}
}

void fin_close(){
    fin.close();
}

void fout_open(string path){
    fout.open(path);
    if(fout.fail()){
		cerr << "Output Error!" << endl;
        exit(0);
	}

    fout << fixed;
    fout.precision(3);
}

void fout_close(){
    fout.close();
}

void Input(){
    string str_line;
    while(getline(fin, str_line)){
        int pos1 = str_line.find(",");
        int pos2 = str_line.find(",", pos1+1);

        string str_app = str_line.substr(pos1+1, pos2-pos1-1);
        //cout << str_app << endl;

        if(st_app.find(str_app) == st_app.end()) st_app.insert(str_app);
    }
}

void Count(){
    for(string str_app : st_app){
        if(st_total_app.find(str_app) == st_total_app.end()){
            st_total_app.insert(str_app);
            mp_total_app[str_app] = 1;
        }
        else mp_total_app[str_app]++;
    }
}

void Sorting(){
    for(string str_app : st_total_app) vc_total.emplace_back(mp_total_app[str_app], str_app);
    sort(vc_total.begin(), vc_total.end());
    reverse(vc_total.begin(), vc_total.end());
}

void Output(){
    cout << "total number of files : " << file_names.size() << endl;
    for(pis it : vc_total) cout << it.ff << " " << it.ss << endl;
}

int main(){
//  freopen("input.txt", "r", stdin);
    freopen("output.txt", "w", stdout);

    get_dir();

    // Set UTF-8 Code Page Identifiers
    system("chcp 65001");

    for(string str : file_names){
        //cout << "Processing... " << str << endl;

        st_app.clear();

        fin_open(str);
        Input();
        fin_close();

        Count();
    }

    Sorting();

    Output();
/*
    fout_open("Filter_output.txt");
    Output_Filter();
    fout_close();

    fout_open("Count_output.csv");
    Count();
    Count_Sorting();
    fout_close();

    fout_open("Comment_output.txt");
    Output_Comment();
    fout_close();
*/
	return 0;
}