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

// list of directory ("AppUsageEventEntity" included)
vector<string> file_names;

// ifstream & ofstream
ifstream fin;
ofstream fout;

// store list of app names (in one file)
unordered_set<string> st_app;

// store list and number of app names (in all files)
unordered_set<string> st_total_app;
unordered_map<string, int> mp_total_app;

// sorting number and app names
vector<pis> vc_total;

int get_dir(){
    for(const auto &file : recursive_directory_iterator("C:/Users/jx2ha/Desktop/2-1/CS481/Week 5 (0327-0402)/Dataset")){
        string str_path = file.path().string();
        replace(str_path.begin(), str_path.end(), '\\', '/'); // replace '\' to '/'

        // Find AppUsageEventEntity files
        if(str_path.find("AppUsageEventEntity") == 141){
            file_names.push_back(str_path);

            cout << str_path.substr(60) << endl;
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

void Input(){
    string str_line;

    // Take one line at a time until reach the end of the file...
    while(getline(fin, str_line)){
        // first & second ',' position
        int pos1 = str_line.find(",");
        int pos2 = str_line.find(",", pos1+1);

        // Extract app name from one row
        string str_app = str_line.substr(pos1+1, pos2-pos1-1);

        // if str_app is new app's name -> store at st_app
        if(st_app.find(str_app) == st_app.end()) st_app.insert(str_app);
    }
}

// Add Count 1 to st_total_app and mp_total_app for apps stored in st_app
void Count(){
    for(string str_app : st_app){
        if(st_total_app.find(str_app) == st_total_app.end()){
            st_total_app.insert(str_app);
            mp_total_app[str_app] = 1;
        }
        else mp_total_app[str_app]++;
    }
}

// Sort by app name that appears frequently
void Sorting(){
    for(string str_app : st_total_app) vc_total.emplace_back(mp_total_app[str_app], str_app);
    sort(vc_total.begin(), vc_total.end());
    reverse(vc_total.begin(), vc_total.end());
}

// Output
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

	return 0;
}